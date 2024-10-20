import styles from "./page.module.css";
import { ExchangeRateComponent } from "./components/ExchangeRateComponent";
import { ExchangeCurrencyForm } from "./components/ExchangeCurrencyForm";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>Exchange Rates App</main>
      <ExchangeRateComponent />
      <ExchangeCurrencyForm />
    </div>
  );
}
