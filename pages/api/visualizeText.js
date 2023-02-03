import { getRateLimitMiddlewares, applyMiddleware } from "lib/rateLimiting"
import { Configuration, OpenAIApi } from "openai"

const configuration = new Configuration({
    organization: process.env.OPENAI_API_ORG,
    apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)
const middlewares = getRateLimitMiddlewares().map(applyMiddleware)

export default async function handler(request, response) {
    try {
        await Promise.all(
            middlewares.map(middleware => middleware(request, response))
        )
    } catch {
        return response.status(429).send('Too Many Requests')
    }

    try {
        const openAIResponse = await openai.createImage({
            prompt: request.body.prompt,
            n: 1,
            size: "256x256",
        });

        const image = openAIResponse.data.data[0]

        response.status(201).json({
            image,
            ...request.rateLimit
        })
    } catch (err) {
        response.status(500).json(err)
    }
}