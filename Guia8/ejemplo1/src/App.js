import './App.css';

const App = () => {
  function tick () {
    return new Date().toLocaleTimeString();
  }
  return(
    <>
      <h1>Hola Mundo</h1>
      <h2>Son las {setInterval(tick(), 1000)}.</h2>
    </>
  );
}

export default App;
