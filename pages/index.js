import Navbar from "../components/Navbar";
import React, { useRef } from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "currency-flags/dist/currency-flags.min.css";
import CurrencyDropdown from "../components/CurrencyDropdown";

export async function getServerSideProps(context) {
  const { data } = await axios.get(`https://api.apilayer.com/fixer/latest`, {
    headers: {
      apiKey: "0pBd9DQRNUuOh9dqEVu0zKVJGfCS5AR9",
    },
  });
  const { data: symbols } = await axios.get(
    `https://api.apilayer.com/fixer/symbols`,
    {
      headers: {
        apiKey: "0pBd9DQRNUuOh9dqEVu0zKVJGfCS5AR9",
      },
    }
  );
  return {
    props: {
      data: data.rates,
      symbols: symbols.symbols,
    },
  };
}

export default function Home({ data, symbols }) {
  const [amount, setAmount] = useState("");
  const [convertedAmt, setConvertedAmt] = useState("");
  const selectedCurrency = useRef({
    from: "USD",
    to: "EUR",
  });

  const handleChange = (val) => {
    setAmount(val);
    const convertedAmount =
      (data[selectedCurrency.current.to] /
        data[selectedCurrency.current.from]) *
      val;
    setConvertedAmt(convertedAmount.toFixed(4));
  };

  const handleFrom = (val) => {
    selectedCurrency.current = {
      ...selectedCurrency.current,
      from: val,
    };
    handleChange(amount);
  };
  const handleTo = (val) => {
    selectedCurrency.current = {
      ...selectedCurrency.current,
      to: val,
    };
    handleChange(amount);
  };

  const handleClick = () => {
    selectedCurrency.current = {
      from: selectedCurrency.current.to,
      to: selectedCurrency.current.from,
    };
    handleChange(amount);
  };
  return (
    <>
      <Navbar />
      <div className="p-10 ">
        <div className="flex mb-5 font-bold text-5xl justify-center text-center">
          <h1 className="text-indigo-500">Currency </h1>
          <h1 className=" text-slate-700">Converter</h1>
        </div>

        <div className="flex  font-bold w-4/6 items-end text-2xl m-auto mb-3 gap-5">
          <div className="flex flex-col w-full">
            <h1>From</h1>
            <CurrencyDropdown
              data={data}
              symbols={symbols}
              selectedCurrency={selectedCurrency.current.from}
              setSelectedCurrency={handleFrom}
              from={true}
            />
          </div>

          <button
            className="px-4 py-2 bg-indigo-500 rounded mb-2"
            onClick={handleClick}
          >
            <svg
              stroke="currentColor"
              fill="white"
              strokeWidth="0"
              viewBox="0 0 512 512"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 168v-16c0-13.255 10.745-24 24-24h360V80c0-21.367 25.899-32.042 40.971-16.971l80 80c9.372 9.373 9.372 24.569 0 33.941l-80 80C409.956 271.982 384 261.456 384 240v-48H24c-13.255 0-24-10.745-24-24zm488 152H128v-48c0-21.314-25.862-32.08-40.971-16.971l-80 80c-9.372 9.373-9.372 24.569 0 33.941l80 80C102.057 463.997 128 453.437 128 432v-48h360c13.255 0 24-10.745 24-24v-16c0-13.255-10.745-24-24-24z"></path>
            </svg>
          </button>

          <div className="flex flex-col w-full align-center">
            <h1>To</h1>
            <CurrencyDropdown
              data={data}
              symbols={symbols}
              selectedCurrency={selectedCurrency.current.to}
              setSelectedCurrency={handleTo}
              from={false}
            />
          </div>
        </div>

        <div className="p-2 gap-2 flex justify-center items-center">
          <h1 className="font-semibold text-2xl text-slate-700">Amount</h1>
          <input
            className="border-[1.5px] shadow-lg border-gray-300 rounded-lg w-2/4 p-2"
            type="number"
            value={amount}
            onInput={(e) => handleChange(e.target.value)}
          />
        </div>

        <div className="flex justify-center items-center mt-5 gap-5">
          <h1 className="font-medium text-2xl items-center">Exchange Rate</h1>
        </div>
        <div className="flex justify-center">
          <div className="border-2 border-indigo-500 w-[20%] p-3 justify-center flex rounded-lg">
            <h1 className=" font-medium text-xl w-full text-center break-words">
              {convertedAmt}
            </h1>
          </div>
        </div>
      </div>
    </>
  );
}
