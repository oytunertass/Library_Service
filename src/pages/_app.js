import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import Navbar from '@/components/Navbar';
import Footer from "@/components/Footer";

export default function App({ Component, pageProps }) {
  return(
    <SessionProvider session={pageProps.session}>
    <Toaster />
    <Navbar />
    <Component {...pageProps} />
    <Footer />
  </SessionProvider>
  );
}
