import React from 'react';
import ReactDOM from 'react-dom/client'; // React 18 부터의 문법임
// import ReactDOM from 'react-dom'; // React 17 까지는 이 문법임
import App from './App';

// React 17까지는...
// ReactDOM.render(<App />, document.getElementById('root'))

// function App() {
//   return <h1>Hello, World!</h1>;
// }

// const App = () => {
//   return <h1>Hello, World!</h1>;
// }

// React 18부터는...
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
