import '@/styles/globals.css'
import "react-toastify/dist/ReactToastify.css";
import UserContextProvider from '@/context/UserContext';

export default function App({ Component, pageProps }) {
  return <UserContextProvider>
    <Component {...pageProps} />
  </UserContextProvider>
}
