import { Navigate } from "react-router-dom"
import { useAuthContext } from "../context/Auth"
import { Avatar as MuiAvatar, Button, Dialog, DialogActions, DialogContent, DialogTitle, styled, Typography } from "@mui/material"
import axios from "../api"
import { useRef, useState } from "react"
import SideContent from "../components/SideContent"
import MainContent from "../components/MainContent"

type TAuthor = { authorId: number, name: string }

type TAuthorResponse = { success: true, data: TAuthor } | { success: false, data: { message: string } }

type TQuote = { quoteId: number, authorId: number, quote: string }
type TQuoteResponse = { success: true, data: TQuote } | { success: false, data: { message: string } }

const ProfileCard = styled("div")({
    display: "flex",
    justifyContent: "center",
    gap: "calc(var(--mui-spacing) * 4)"
})

const Avatar = styled(MuiAvatar)({width: 100, height: 100})

const ProfileInfo = styled("div")({
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between", 
    alignItems: "flex-start"
})

const Profile: React.FC = () => {
    const [open, setOpen] = useState(false)
    const [selectedAuthor, setSelectedAuthor] = useState<TAuthor | null>(null)
    const [selectedQuote, setSelectedQuote] = useState<TQuote | null>(null)
    const timeoutId = useRef<number | null>(null)
    const { token, user } = useAuthContext()
    const isUserAuthorized = Boolean(user)
    const showQuote = Boolean(selectedAuthor && selectedQuote)

    const handleReset = () => {
        setSelectedAuthor(null)
        setSelectedQuote(null)
    }

    const handleUpdateQuote = () => {
        handleReset()
        setOpen(true)
        timeoutId.current = setTimeout(async () => {
            const author = await axios.get<TAuthorResponse>(`/author?token=${token}`)
            if (author.data.success) {
                setSelectedAuthor(author.data.data)
                const authorId = author.data.data.authorId
                timeoutId.current = setTimeout(async () => {
                    const quote = await axios.get<TQuoteResponse>(`/quote?token=${token}&authorId=${authorId}`)
                    if (quote.data.success) {
                        setSelectedQuote(quote.data.data)
                    }
                    setOpen(false)
                }, 5000)
            }
        }, 5000)
    }

    const handleCancel = () => {
        setOpen(false)
        if (timeoutId.current) {
            clearTimeout(timeoutId.current)
        }
        handleReset()
    }

    if (!isUserAuthorized) {
        return <Navigate to="/" />
    }

    return <>
        <SideContent>
            <ProfileCard>
                <Avatar/>
                <ProfileInfo>
                    <Typography variant="h4">{`Welcome, ${user?.fullname}!`}</Typography>
                    <Button variant="contained" onClick={handleUpdateQuote}>Update</Button>
                    <Dialog open={open} maxWidth="sm" fullWidth onClose={() => handleCancel()} >
                        <DialogTitle>Requesting the quote</DialogTitle>
                        <DialogContent>
                            <Typography>{`Step 1: Requesting author... ${selectedAuthor ? "Completed" : ""}`}</Typography>
                            <Typography>{`Step 2: Requesting author... ${selectedQuote ? "Completed" : ""}`}</Typography>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCancel}>Cancel</Button>
                        </DialogActions>
                    </Dialog>
                </ProfileInfo>
            </ProfileCard>
        </SideContent>

        {
            showQuote ? <MainContent>
                <Typography variant="h5" textAlign="center" marginBottom={1}>{selectedAuthor?.name}</Typography>
                <Typography  textAlign="center">{selectedQuote?.quote}</Typography>
            </MainContent> : null
        }

    </>
}

export default Profile