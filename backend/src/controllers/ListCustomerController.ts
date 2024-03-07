import { FastifyRequest, FastifyReply } from "fastify";
import { ListCustomerService } from "../services/ListCustomerService";

class ListCustomerController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const listCostumerService = new ListCustomerService();

    const customer = await listCostumerService.excute();

    reply.send(customer);
  }
}

export { ListCustomerController };
