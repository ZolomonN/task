import { TextField } from "@mui/material"
import { useField } from "formik"

type TInput = {
    article: string,
    label?: string,
}

const Input: React.FC<TInput> = ({article, label}) => {
    const [field, meta] = useField(article)
    const {error, touched} = meta
    const isError = Boolean(error && touched)
    return <TextField {...field} label={label} error={isError} helperText={isError ? error : ""}  />
}

export default Input