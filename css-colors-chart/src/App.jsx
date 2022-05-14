import React, { useState, useEffect } from 'react';
import * as d3 from 'd3'
import './App.css';

const csvUrl = 'https://gist.githubusercontent.com/satoshi-eric/7dcbd8dbd18ac8d3a19596f1667c8abc/raw/csssNamedColors.csv'
const width = 960
const height = 500
const centerX = width / 2
const centerY = height / 2


const pieArc = d3.arc()
  .innerRadius(0)
  .outerRadius(width)

const colorPie = d3.pie().value(1)
const App = () => {
  const [data, setData] = useState(null)

  useEffect(() => {
    d3.csv(csvUrl).then(setData)
  }, [])

  if (!data) {
    return <pre>Loading...</pre>
  }
  
  return (
    <svg width={width} height={height}>
      <g transform={`translate(${centerX}, ${centerY})`}>
        {colorPie(data)
          .map((d, i) => 
           <path 
             key={i} 
             fill={d.data['valores hex RGB']} 
             d={pieArc(d)} 
           />
         )}
        
         {/* {data.map((d, i) => 
           <path 
             key={i} 
             fill={d['valores hex RGB']} 
             d={pieArc({
               startAngle: i/data.length * 2 * Math.PI,
               endAngle: (i+1) / data.length * 2 * Math.PI
             })} 
           />
         )} */}
      </g>
    </svg>
  )
}

export default App;