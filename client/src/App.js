import logo from './logo.svg';
import './App.css';

import SmartContract, {Contracts} from './smartContract';

const smartContract = new SmartContract();
smartContract.initWeb3();

function App() {

  const test = async () => {
    test2();
    const contract = await smartContract.getContract(Contracts.Adoption);
    const account = await smartContract.getAccount();
    const result = await contract.adopt(0, {from: account});
    console.log(result)
  };

  const test2 = async () => {
    const contract = await smartContract.getContract(Contracts.Adoption);
    const adopters = await contract.getAdopters();
    console.log(adopters)
  };

  return (
    <div className="App" onClick={test}>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
