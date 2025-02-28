import { createTheme, GlobalStyles, ThemeProvider } from "@mui/material";

const theme = createTheme({
    cssVariables: {
        colorSchemeSelector: "class"
    },

})

const Theme: React.FC<{ children?: React.ReactNode }> = ({ children }) => {

    return <ThemeProvider theme={theme}>
        <GlobalStyles styles={{
            "html, body": {
                margin: 0
            },
            "*": {
                boxSizing: "border-box"
            }
        }} />
        {children}
    </ThemeProvider>
}

export default Theme