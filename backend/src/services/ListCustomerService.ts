import prismaClient from "../prisma";

class ListCustomerService {
  async excute() {
    const costumers = await prismaClient.customer.findMany();
    return costumers;
  }
}

export { ListCustomerService };
