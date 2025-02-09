import fastify, { FastifyRequest, FastifyReply } from 'fastify'

interface IQuerystring {
  username: string;
  password: string;
}
interface IHeaders {
  'h-Custom': string;
}
interface IReply {
  200: { success: boolean };
  302: { url: string };
  '4xx': { error: string };
}
const server = fastify()

server.get<{
  Querystring: IQuerystring,
  Headers: IHeaders,
  Reply: IReply
}>('/auth', {
  preValidation: (request, reply, done) => {
    const { username, password } = request.query
    done(username !== 'admin' ? new Error('Must be admin') : undefined) // only validate `admin` account
  }
},(request: FastifyRequest<{ Querystring: IQuerystring, Headers: IHeaders }>, reply: FastifyReply) => {
  const customerHeader = request.headers['h-Custom']
  // do something with request data
  reply.send({ success: true })
})


server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})