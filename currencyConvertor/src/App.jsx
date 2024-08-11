import { useState } from 'react';
import  {InputBox} from './components/index.js';
import useCurrencyInfo from './hooks/useCurrency.js';

function App() {
  const [amount, setAmount] = useState(null);
  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('INR');
  const [convertedAmount, setConvertedAmount] = useState(null);
  
  const currencyInfo = useCurrencyInfo(from);
  
  const options = Object.keys(currencyInfo);
  console.log("Currency Info: ", currencyInfo);
  console.log("Options: ", options);
  
  const swap = () => {
    setFrom(to);
    setTo(from);
    setConvertedAmount(amount);
    setAmount(convertedAmount);
  };

  const convert = () => {
    if(currencyInfo[to]) {
      setConvertedAmount(amount * currencyInfo[to]);
    } else {
      console.error("Conversion rate not found for currency: ", to);
    }
  };

  return (
    <div
      className="min-h-screen w-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1720366252332-a86c8a11d879?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
      }}
    >
      <div className="p-8 rounded-lg shadow-md bg-white bg-opacity-30 backdrop-blur-lg backdrop-blur">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            convert();
          }}
          className="space-y-6"
        >
          <div>
            <InputBox
              label="From"
              amount={amount}
              currencyOptions={options}
              onCurrencyChange={(currency) => {
                setFrom(currency);
              }}
              onAmountChange={(amount) => {
                setAmount(amount);
              }}
              selectedCurrency={from}
            />
          </div>

          <div className="flex justify-center">
            <button
              type="button"
              className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
              onClick={swap}
            >
              Swap
            </button>
          </div>

          <div>
            <InputBox
              label="To"
              amount={convertedAmount}
              currencyOptions={options}
              onCurrencyChange={(currency) => {
                setTo(currency);
              }}
              selectedCurrency={to}
              disabled
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Convert from {from.toUpperCase()} to {to.toUpperCase()}
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;