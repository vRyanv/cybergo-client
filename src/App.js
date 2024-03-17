import 'bootstrap/dist/js/bootstrap.min.js'
import 'jquery/dist/jquery.min.js'

import './assets/css/lib/bootstrap.min.css';
import './assets/css/lib/style.css';

import CssBaseline from '@mui/material/CssBaseline'
import {ThemeProvider} from '@mui/material/styles'

import CyberGoRouter from "./route";
import CyberTheme from './theme/cyber-theme'

import TokenProvider from '~/context/UserTokenContext'
import LoadingOverlay from '~/components/loading'

function App() {
  return(
   <ThemeProvider theme={CyberTheme}>
     <CssBaseline/>
       <TokenProvider>
           <LoadingOverlay />
           <CyberGoRouter/>
       </TokenProvider>
   </ThemeProvider>
  )
}

export default App;
