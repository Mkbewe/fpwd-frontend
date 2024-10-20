"use client";
import { useState } from "react";

export const ExchangeCurrencyForm = () => {
  const [amount, setAmount] = useState<number>(0);
  const [result, setResult] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/exchange-rates", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch exchange rate");
      }

      const amountExchanged: number = await response.json();
      setResult(amountExchanged);
    } catch (err: unknown) {
      console.error("Error:", err);
      setResult(null);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="amount">Amount:</label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(+e.target.value)}
          required
        />
        <button type="submit">Convert</button>
      </form>
      {result !== null && <p>Converted Amount: {result.toFixed(2)}</p>}{" "}
    </div>
  );
};
