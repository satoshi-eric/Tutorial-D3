import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import * as d3 from 'd3'
import './App.css';

const csvUrl = 'https://gist.githubusercontent.com/satoshi-eric/7dcbd8dbd18ac8d3a19596f1667c8abc/raw/csssNamedColors.csv'

const message = data => {
  let message = ''
  message += Math.round(d3.csvFormat(data).length / 1024) + ' kB\n'
  message += data.length + ' rows\n'
  message += data.columns.length + ' columns\n'
  return message
}

const App = () => {
  const [data, setData] = useState(null)

  useEffect(() => {
    d3.csv(csvUrl).then(setData)
  }, [])
  return <pre>Data is {data ? message(data) : 'Loading...'}</pre>
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);