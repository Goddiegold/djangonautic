import '@/styles/globals.css'
import "react-toastify/dist/ReactToastify.css";
import UserContextProvider from '@/context/UserContext';
import Header from '@/components/Header';
import styles from "@/styles/App.module.css"
import { ToastContainer } from "react-toastify";

export default function App({ Component, pageProps }) {
  return <UserContextProvider>
  <div className={styles.wrapper}>
  <ToastContainer/>
  <Header/>
    <Component {...pageProps} />
  </div>
  </UserContextProvider>
}
