import './App.css';
import logo from './logo.svg';
import React from "react";
import DropDown from "./dropDown/DropDown";

function App() {

  const data = {
    stackOne: [
      {id: 121, name: 'Bitcon', symbol: 'BTC', currency: '$', currentPrice: '12773.11', dayChange: ((Math.random()*100).toFixed(2))},
      {id: 123, name: 'Ripple', symbol: 'XRP', currency: '$', currentPrice: '0.29', dayChange: ((Math.random()*100).toFixed(2))},
      {id: 124, name: 'Ethereum', symbol: 'ETH', currency: '$', currentPrice: '508.20', dayChange: ((Math.random()*100).toFixed(2))},
      {id: 125, name: 'Litecoin', symbol: 'LTC', currency: '$', currentPrice: '82.09', dayChange: ((Math.random()*100).toFixed(2))},
      {id: 126, name: 'Bitcoin Cash / BCC', symbol: 'BCC', currency: '$', currentPrice: '256.10', dayChange: ((Math.random()*100).toFixed(2))},
      {id: 127, name: 'EOS', symbol: 'EOS', currency: '$', currentPrice: '2.63', dayChange: ((Math.random()*100).toFixed(2))},
      {id: 128, name: 'Binance Coin', symbol: 'BNB', currency: '$', currentPrice: '29.00', dayChange: ((Math.random()*100).toFixed(2))},
      {id: 129, name: 'Tether', symbol: 'USDT', currency: '$', currentPrice: '1.00', dayChange: ((Math.random()*100).toFixed(2))}
  ]
  }

  const preloadFunc = (data) => {
    return data.stackOne.filter((x)=> x.id >= 1 )
  }

  const onChangeCallback = async(data) => {
    let effect = new Promise((resolve, reject) => {
      setTimeout(() => resolve('Done'), 1000)
    })

    let res = await effect
    console.log(res)
    console.log('items: ',data)
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <div style={{height:'700px', width:'60%'}}>
          <DropDown
            multiSelect={true}
            placeholder='Поиск валют...'
            data={data}
            onChangeCallback={(data) => {onChangeCallback(data)}}
            preloadFunc={preloadFunc}
          />
        </div>

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
