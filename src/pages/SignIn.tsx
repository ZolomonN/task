import { Form, Formik } from "formik"
import Input from "../components/Input"
import { Alert, Button, styled } from "@mui/material"
import * as Yup from 'yup'
import { useCallback, useState } from "react"
import axios from "../api"
import { useAuthContext } from "../context/Auth"
import SideContent from "../components/SideContent"
import SideImage from "../components/SideImage"
import MainContent from "../components/MainContent"
import { Navigate } from "react-router-dom"

type TAuthResponse = { success: true, data: { token: string } } | { success: false, data: { message: string } }

const validationSchema = Yup.object().shape({
    email: Yup.string().email("Incorrect email format").required("This field is required"),
    password: Yup.string().required("This field is required"),
})

const initials = { email: "aleksei@example.com", password: "lkJlkn8hj" }

const FormWrapper = styled("div")({ alignSelf: "center" })

const FormContainer = styled("div")({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: 300,
    height: 400,
    gap: "calc(var(--mui-spacing) * 2)"
})

const SignIn: React.FC = () => {
    const { user, handleSetToken } = useAuthContext()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const isUserAuthorized = Boolean(user)

    const handleSubmit = useCallback(async (values: { email: string, password: string }) => {
        setLoading(true)
        const authResponse = await axios.post<TAuthResponse>("login", values)
        setLoading(false)
        if (authResponse.data.success) {
            const token = authResponse.data.data.token
            handleSetToken(token)
        } else {
            setError(authResponse.data.data.message)
        }
    }, [])

    if (isUserAuthorized) {
        return <Navigate to="/" />
    }

    return <>
        <SideContent>
            <SideImage />
        </SideContent>
        <MainContent>
            <FormWrapper>
                <Formik initialValues={initials} validationSchema={validationSchema} onSubmit={handleSubmit}>
                    {() => {
                        return <Form>
                            <FormContainer>
                                {error ? <Alert severity="error">{error}</Alert> : null}
                                <Input article="email" label="Email" />
                                <Input article="password" label="Password" />
                                <Button variant="contained" type="submit" loading={loading} disabled={loading}>Submit</Button>
                            </FormContainer>
                        </Form>

                    }}
                </Formik>
            </FormWrapper>
        </MainContent>
    </>
}

export default SignIn