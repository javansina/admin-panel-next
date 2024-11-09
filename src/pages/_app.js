import TanstackQueryProvider from "@/providers/TanstackQueryProvider";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <TanstackQueryProvider>
      <Component {...pageProps} />
    </TanstackQueryProvider>
  );
}
