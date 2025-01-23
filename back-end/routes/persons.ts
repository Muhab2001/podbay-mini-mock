import { FastifyInstance, FastifyPluginOptions, FastifyRequest } from "fastify";
import { findPersonById } from "../services/person";

export default async function personRoutes (fastify: FastifyInstance, options: FastifyPluginOptions) {
    fastify.get('/:id', async (request: FastifyRequest<{ Params: { id: string } }>, reply) => {
        const { id } = request.params
        const person = await findPersonById(fastify.kysely.pg, parseInt(id))
        reply.send(person)
    })
}