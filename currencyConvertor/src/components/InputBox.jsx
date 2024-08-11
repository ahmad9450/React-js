import React, { useId } from 'react';

const InputBox = ({
  label,
  amount = 1,
  onAmountChange,
  onCurrencyChange,
  currencyOptions = [],
  selectedCurrency = 'USD',
  amountDisable = false,
  currencyDisable = false,
}) => {
  let amountInputId = useId();

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="mb-4">
        <label htmlFor={amountInputId} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        <div className="flex items-center">
          <input
            id={amountInputId}
            className="block w-full rounded-md  py-1.5 pl-2 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 sm:text-sm sm:leading-6 outline-none" 
   
            placeholder="Amount"
            value={amount}
            disabled={amountDisable}
            type="number"
            onChange={(e) => {
              onAmountChange && onAmountChange(Number(e.target.value));
            }}
          />
          <select
            className="h-full rounded-md ring-1 ring-gray-300 bg-transparent py-1  text-gray-500  sm:text-sm outline-none"
            value={selectedCurrency}
            disabled={currencyDisable}
            onChange={(e) => {
              onCurrencyChange(e.target.value);
            }}
          >
            {currencyOptions.map((val) => (
              <option key={val} value={val}>
                {val}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default InputBox;