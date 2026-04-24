import '../styles/globals.css'
import Script from 'next/script'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Script
        src="https://chatbot-saas-blue.vercel.app/widget.js?botId=69eabb6de05adbdd2ccd3971"
        strategy="afterInteractive"
      />
    </>
  )
}
