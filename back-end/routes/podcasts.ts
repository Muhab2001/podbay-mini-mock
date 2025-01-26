import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import {z} from 'zod'
import { searchPodcasts } from "../services/podcasts";
import { cacheiTunesPodcasts } from "../integrations/itunes";
import { emitWarning } from "node:process";

export default async function podcastRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {

    fastify.withTypeProvider<ZodTypeProvider>().route({
        method: 'GET',
        url: '/',
        schema: {
            querystring: z.object({
                term: z.string().min(0).default(''),
                // we need coercion as default zod
                // treats all params as strings
                limit: z.coerce.number().int().min(0).max(25).default(20),
                page: z.coerce.number().int().min(1).default(1)
            }),
            response: {
                200: z.object({
                    message: z.string(),
                    statusCode: z.number(),
                    results: z.array(z.object({
                        collectionId: z.number(),
                        trackId: z.number(),
                        artistName: z.string(),
                        trackName: z.string(),
                        collectionName: z.string(),
                        artworkUrl100: z.string().nullable(),
                        artworkUrl60: z.string().nullable(),
                        artworkUrl30: z.string().nullable()
                    }))
                }),
                // TODO: should be set globablly for scalability
                400: z.object({
                    error: z.string(),
                    message: z.string(),
                    statusCode: z.number(),
                    details: z.object({
                        issues: z.any(),
                        method: z.string(),
                        url: z.string()
                    })
                }),
            }
        },
        handler: async (req, res) => {
            // TODO: should set the db instance as a plugin
            // with shorter access path
            const {results, is_cached} = await searchPodcasts(fastify.kysely.pg, req.query.term, req.query.limit, req.query.page)
            
            
            
            await res.send(
                {
                    statusCode: 200,
                    message: 'Successfully retrieved podcasts',
                    results: results
                }
            )
            
            // save all fetched products after sending the HTTP response
            if (!is_cached){
            try{
                setTimeout(async () => {
                    await cacheiTunesPodcasts(fastify.kysely.pg, results),
                    5000
                })
            
            }
            catch (error) 
            {
                console.log(error)
            }
            
        }
    }

    })

}