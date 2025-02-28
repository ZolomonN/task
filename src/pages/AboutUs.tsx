import { useEffect, useState } from "react"
import parse from "html-react-parser"
import axios from "../api"
import { Typography } from "@mui/material"
import SideContent from "../components/SideContent"
import MainContent from "../components/MainContent"
import SideImage from "../components/SideImage"



const AboutUs: React.FC = () => {
    const [description, setDescription] = useState<string>("")
    useEffect(() => {
        (async () => {
            const response = await axios<{ success: boolean, data: { info: string } }>("/info")
            setDescription(response.data.data.info)
        })()
    }, [])
    return <>
        <SideContent>
            <SideImage />
        </SideContent>
        <MainContent>
            <Typography variant="h5" textAlign="center" marginBottom={1}>{parse(description)}</Typography>
            <Typography >{"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}</Typography>
        </MainContent>
    </>
}

export default AboutUs