import WebPush from 'web-push'
import { FastifyInstance } from "fastify"
import { z } from 'zod'

const publicKey = 'BN4PKBs5JF128LEzWL6e6BKR2cdSM2tW6VqED6ZDzZluZX9p6WMyHqufhesYiZwKL4oelvWhwQ0023czmS1IPg4'
const privateKey = '-hcu3IFXzhPRFUVUcPUCWKxph2VCH-0oxvTxtHQDrQw'

WebPush.setVapidDetails(
  'http://localhost:3333',
  publicKey,
  privateKey,
)

export async function notificationsRoutes(app: FastifyInstance) {
  app.get('/push/public_key', () => {
    return {
      publicKey,
    }
  })

  app.post('/push/register', (request, reply) => {
    console.log(request.body)

    return reply.status(201).send()
  })

  app.post('/push/send', async (request, reply) => {
    const sendPushBody = z.object({
      subscription: z.object({
        endpoint: z.string(),
          keys: z.object ({
          p256dh: z.string(),
          auth: z.string(),
        })
      })
    })
  
    const { subscription } = sendPushBody.parse(request.body)

    WebPush.sendNotification(subscription, 'HELLO DO BACKEND')

  return reply.status(201).send()

 })
}
