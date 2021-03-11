import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import { ProductRepository } from "../typeorm/repositories/ProductsRepository";
// import RedisCache from '@shared/cache/RedisCache';

interface IRequest {
  id: number;
}

class DeleteProductService {
  public async execute({ id }: IRequest): Promise<void> {
    const productRepository = getCustomRepository(ProductRepository);

    const product = await productRepository.findOne(id);

    if(!product) {
      throw new AppError('Product not found');
    }

    // const redisCache = new RedisCache();

    // await redisCache.invalidade('api-vendas-PUBJAIZ-LIST');

    await productRepository.remove(product);
  }
}

export default DeleteProductService;
