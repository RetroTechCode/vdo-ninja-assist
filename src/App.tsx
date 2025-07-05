import "./App.css";
import InformalLoungeLogo from "./assets/InformalLoungeLogo.webp";
import injectPassword from "./helpers/injectPassword";

function App() {
  return (
    <>
      <div>
        <img src={InformalLoungeLogo} height={128} width={128} />
      </div>
      <h1>
        Informal Lounge
        <br /> VDO Ninja Assitant
      </h1>
      <form>
        <input type="password" data-pid="123" className="largeTextEntry" />
        <button type="submit" data-pid="123">
          Submit
        </button>
      </form>
      <div className="card">
        <button onClick={() => injectPassword()}>Get Started</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
