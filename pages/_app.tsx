import "bootstrap/dist/css/bootstrap.min.css";
import type { AppProps } from "next/app";
import { CartProvider } from "../context/CartContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <Component {...pageProps} />
    </CartProvider>
  );
}

export default MyApp;
