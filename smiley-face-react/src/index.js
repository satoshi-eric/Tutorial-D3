import React from 'react';
import ReactDOM from 'react-dom/client';
import { range } from 'd3';
import { Face } from './components/Face';


const width = 166
const height = 166

const array = range(20)

const App = () => {
  const faces = array.map((value) => (
    <Face
      key={value}
      width={960}
      height={500}
      centerX={width / 2}
      centerY={height / 2}
      strokeWidth={10}
      eyeOffsetX={30}
      eyeOffsetY={30}
      eyeRadius={5 + Math.random() * 10}
      mouthWidth={10}
      mouthRadius={40}
    />
  ))
  console.log(faces)
  return faces
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);