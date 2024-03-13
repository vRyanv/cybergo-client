import './App.module.css';
import CyberGoRouter from "./route";
import {ThemeProvider} from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import CyberTheme from './theme/cyber-theme'
function App() {
  return(
   <ThemeProvider theme={CyberTheme}>
     <CssBaseline/>
     <CyberGoRouter/>
   </ThemeProvider>
  )
}

export default App;
