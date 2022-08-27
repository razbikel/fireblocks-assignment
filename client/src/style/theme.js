import { createTheme } from '@mui/material/styles';


export const theme = createTheme({
    components: {
        MuiTypography:{
            styleOverrides:{
                h1:{
                    fontSize:"36px",
                    marginBottom:"30px"
                }
            }
        }
      },
    })