import axios from "axios"
import AxiosMockAdapter from "axios-mock-adapter"
import authors from "./authors.json"
import quotes from "./quotes.json"
import getRandomInt from "../helpers/getRandomInt"
import getUrlParams from "../helpers/getUrlParams"

const token = "fb566635a66295da0c8ad3f467c32dcf"

const responseWithError = {
    success: false,
    data: {
        message: "Access denied."
    }
}

const mock = new AxiosMockAdapter(axios)

//info

mock.onGet("/info").reply(200, {
    success: true,
    data: {
        info: "Some information about the <b>company</b>."
    }
})

//login

mock.onPost("/login", { email: "aleksei@example.com", password: "lkJlkn8hj" }).reply(200, {
    success: true,
    data: {
        token
    }
})

mock.onPost("/login").reply(200, responseWithError)

//profile

const profileUrl = new RegExp(`\/profile/*`);

mock.onGet(profileUrl).reply((config) => {
    const params = getUrlParams(config.url as string)
    const isUserExist = params.token === token

    if (isUserExist) {
        return [200, {
            success: true,
            data: {
                "fullname": "Aleksei K",
                "email": "aleksei@example.com"
            }
        }]
    } else {
        return [200, responseWithError]
    }

})

//author

const authorUrl = new RegExp(`\/author/*`);

mock.onGet(authorUrl).reply((config) => {
    const params = getUrlParams(config.url as string)
    const isTokenExist = params.token === token
    if (isTokenExist) {
        const authorsLength = authors.length
        const randomIndex = getRandomInt(authorsLength - 1)
        return [200, {
            success: true,
            data: authors[randomIndex]
        }]
    } else {
        return [200, responseWithError]
    }

})

//quote

const quoteUrl = new RegExp(`\/quote/*`);

mock.onGet(quoteUrl).reply((config) => {
    const params = getUrlParams(config.url as string)
    const isTokenExist = params.token === token
    const isAuthorExist = Boolean(params.authorId)
    if (isTokenExist && isAuthorExist) {
        const filteredQuotes = quotes.filter(quote => quote.authorId === Number(params.authorId))
        const quotesLength = filteredQuotes.length
        const randomIndex = getRandomInt(quotesLength - 1)
        return [200, {
            success: true,
            data: filteredQuotes[randomIndex]
        }]
    } else {
        return [200, responseWithError]
    }

})


//logout

const logoutUrl = new RegExp(`\/logout/*`);

mock.onDelete(logoutUrl).reply((config) => {
    const params = getUrlParams(config.url as string)
    const isTokenExist = params.token === token
    if (isTokenExist) {
        return [200, {
            success: true,
            data: {}
        }]
    } else {
        return [200, responseWithError]
    }

})

export default axios