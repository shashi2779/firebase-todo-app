import { AuthUserProvider } from '@/firebase/authContext'
import '@/styles/globals.css'


export default function App({ Component, pageProps }) {
  return (
    <>
     {/* context store se wrape kiaa */}
      <AuthUserProvider>
        <Component {...pageProps} />
      </AuthUserProvider>
    </>
  )

}
