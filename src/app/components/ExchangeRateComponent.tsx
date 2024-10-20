"use client";
import { useEffect, useState } from "react";

interface ExchangeRateResponse {
  exchange_rate: number;
}

async function fetchExchangeRate(): Promise<ExchangeRateResponse> {
  const response = await fetch("http://localhost:4000/exchange-rates");
  if (!response.ok) {
    throw new Error("Something went wrong");
  }

  return response.json();
}

export const ExchangeRateComponent = () => {
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);

  const updateExchangeRate = async () => {
    try {
      const data = await fetchExchangeRate();
      setExchangeRate(data.exchange_rate);
    } catch (error) {
      console.error("Failed to fetch exchange rate:", error);
    }
  };

  useEffect(() => {
    updateExchangeRate();
    const intervalId = setInterval(updateExchangeRate, 60000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      {exchangeRate !== null ? (
        <p>Current Exchange Rate: {exchangeRate.toFixed(2)}</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
