// https://github.com/d3/d3-scale#band-scales

import React, { useState, useEffect } from 'react';
import * as d3 from 'd3'
import './App.css';

const csvUrl = 'https://gist.githubusercontent.com/satoshi-eric/1c02b799236e247b2b989edae4ca89d3/raw/UN_Population_2019.csv'
const width = 960
const height = 500
const margin = { top: 20, right: 20, bottom: 20, left: 200 }


const App = () => {
  const [data, setData] = useState(null)

  useEffect(() => {
    const row = d => {
      d.Population = +d['2020']
      return d
    }
    d3.csv(csvUrl, row).then(data => {
      setData(data.slice(0, 10))
    })
  }, [])

  if (!data) {
    return <pre>Loading...</pre>
  }

  const innerHeight = height - margin.top - margin.bottom
  const innerWidth = width - margin.left - margin.right

  const yScale = d3.scaleBand()
    .domain(data.map(d => d.Country))
    .range([0, innerHeight])
    .padding(0.1)

  const xScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.Population)])
    .range([0, innerWidth])

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left},${margin.top})`}>
        {xScale.ticks().map(tickValue => (
          <g key={tickValue} transform={`translate(${xScale(tickValue)},0)`}>
            <line y2={innerHeight} stroke="black" />
            <text
              style={{ textAnchor: 'middle' }}
              dy=".71em"
              y={innerHeight + 3}
            >
              {tickValue}
            </text>
          </g>
        ))}
        {yScale.domain().map(tickValue => (
          <text
            key={tickValue}
            style={{ textAnchor: 'end' }}
            x={-3}
            dy=".32em"
            y={yScale(tickValue) + yScale.bandwidth() / 2}
          >
            {tickValue}
          </text>
        ))}
        {data.map(d => {
          console.log(d)
          console.log(xScale(d.Population))
          return <rect
            key={d.Country}
            x={0}
            y={yScale(d.Country)}
            width={xScale(d.Population)}
            height={yScale.bandwidth()}
          />
        })}
      </g>
    </svg>
  )
}

export default App;