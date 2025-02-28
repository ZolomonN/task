const getUrlParams = (url: string) => {
    const params = url.split("?")[1]
    if (!params) {
        return {}
    } else {
        const resolvedParams = params.split("&").reduce<{[key: string]: any}>((acc, param) => {
            const [key, value] = param.split("=")
            if (key) {
                acc[key] = value
            }
            return acc
        }, {})
        return resolvedParams
    }
}

export default getUrlParams