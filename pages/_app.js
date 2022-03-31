import { app } from '../utils/firebase'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-calendar/dist/Calendar.css';
import '../styles/globals.css'
import Layout from '../comps/layout'

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
    
    )
}

export default MyApp
