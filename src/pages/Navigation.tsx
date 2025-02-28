import { Button, styled } from "@mui/material"
import { Outlet, useNavigate } from "react-router-dom"
import { useAuthContext } from "../context/Auth"

const NAV_HEIGHT = 70

const NavigationContainer = styled("div")({
    position: "fixed",
    top: 0,
    right: 0,
    left: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: NAV_HEIGHT,
    gap: "calc(var(--mui-spacing) * 2)",
    backdropFilter: "blur(15px)"
})

const ContentContainer = styled("div")({
    display: "flex",
    width: "100dvw",
    height: "100dvh",
    paddingTop: NAV_HEIGHT

})

const Navigation: React.FC = () => {
    const navigate = useNavigate()
    const { user, handleRemoveToken } = useAuthContext()
    const isUserAuthorized = Boolean(user)

    return <>
        <NavigationContainer>
            <Button variant="outlined" onClick={() => navigate("/")}>About us</Button>
            {isUserAuthorized ? <>
                <Button variant="outlined" onClick={() => navigate("/profile")}>Profile</Button>
                <Button variant="outlined" onClick={() => handleRemoveToken()}>Sign out</Button>
            </> :
                <Button variant="outlined" onClick={() => navigate("/sign_in")}>Sign in</Button>
            }

        </NavigationContainer>
        <ContentContainer>
            <Outlet />
        </ContentContainer>

    </>
}

export default Navigation