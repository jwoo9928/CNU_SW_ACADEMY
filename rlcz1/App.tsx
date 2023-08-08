import React from 'react';
import register_img from './assets/images/register-img.jpg';
import Register from './components/Register';
import './App.css';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={register_img} className='register-img'  alt="img" />
        <Register />
      </header>
    </div>
  );
}

export default App;
