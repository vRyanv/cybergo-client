import {createTheme} from "@mui/material";
import {orange, blue, green, red} from "@mui/material/colors";

const CyberTheme = createTheme({
    palette:{
        primary: orange,
        secondary: orange,
        success: green,
        danger: {
            light: red[300],
            main: red[500],
            dark: red[700],
            darker: red[900],
        },
        info: {
            light: blue[300],
            main: blue[500],
            dark: blue[700],
            darker: blue[900],
        },
        ochre: {
            main: '#E3D026',
            light: '#E9DB5D',
            dark: '#A29415',
            contrastText: '#242105',
        },
    }
})

export default CyberTheme;
