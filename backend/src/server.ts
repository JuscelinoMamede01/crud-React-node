import Fastify from "fastify";
import cors from "@fastify/cors";
import { routes } from "./routes";

// inicializando o fastify
const app = Fastify({ logger: true });

const start = async () => {
  //chamando as rotas
  await app.register(cors);
  await app.register(routes);

  try {
    await app.listen({ port: 3333 });
  } catch (error) {
    process.exit(1);
  }
};

start();
