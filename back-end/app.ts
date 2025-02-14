import * as dotenv from "dotenv";
dotenv.config();

import Fastify from 'fastify'
import { hasZodFastifySchemaValidationErrors, isResponseSerializationError, serializerCompiler, validatorCompiler, ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'
import {pathToFileURL} from 'url'
import { realpathSync } from "fs";
import { Kysely } from "kysely";
import { Database } from "./database/schemas/full_db";
import { fastifyKysely } from "fastify-kysely";
import { initDB } from "./database/init";
import podcastRoutes from "./routes/podcasts";

declare module 'fastify' {
    

    interface FastifyKyselyNamespaces {
        pg: Kysely<Database>
    }
}

async function init(){
    const app = Fastify()
    app.setValidatorCompiler(validatorCompiler)
    app.setSerializerCompiler(serializerCompiler)

    const typed_app = app.withTypeProvider<ZodTypeProvider>()
    await app.register(
        fastifyKysely,
        {
            namespace: 'pg',
            kysely: initDB()
        }
    )

    

    typed_app.setErrorHandler((err, req, reply) => {
        if (hasZodFastifySchemaValidationErrors(err)) {
            return reply.code(400).send({
                error: 'Response Validation Error',
                message: "Request doesn't match the schema",
                statusCode: 400,
                details: {
                    issues: err.validation,
                    method: req.method,
                    url: req.url,
                },
            })
        }

        if (isResponseSerializationError(err)) {
            return reply.code(500).send({
                error: 'Internal Server Error',
                message: "Response doesn't match the schema",
                statusCode: 500,
                details: {
                    issues: err.cause.issues,
                    method: err.method,
                    url: err.url,
                },
            })
        }
        
        // the rest of the error handler
    })

    typed_app.route({
        method: "GET",
        url: "/ping",
        schema: {
            querystring: z.object({
                name: z.string().min(4)
            }),
            response: {
                200: z.object({
                    name: z.string()
                })
            }
        },
        handler: async (req, res) => {
            res.send({name: `pong: ${req.query.name}`})
        }

    })

    typed_app.register(podcastRoutes, {
        'prefix': '/podcasts'
    })

    return typed_app
}

function wasCalledAsScript() {
    /**
     * @returns {Boolean} Whether or not this file was called from a nodejs app 
     * (needed to determine how to expose the endpoints in a serverless context)
     * 
     */
    const realPath = realpathSync(process.argv[1]);

    // Convert the file-path to a file-url before comparing it
    const realPathAsUrl = pathToFileURL(realPath).href;
  
    return import.meta.url === realPathAsUrl;
}


if (wasCalledAsScript()) {
    // called directly i.e. "node app"
    const app = await init();
    try {
      await app.listen({ port: 8000 });
      console.log('server listening on 3000');
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  } else {
    // required as a module => executed on aws lambda
    // @ts-ignore
    module.exports = init
  }