import '../styles/globals.css'
import Header from '../components/header'
import Footer from '../components/footer'

function MyApp({ Component, pageProps }) {
  return <div>
  <Component {...pageProps} />
  <Footer />
  </div>
}
export default MyApp