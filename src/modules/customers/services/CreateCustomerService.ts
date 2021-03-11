import AppError from "@shared/errors/AppError";
import { hash } from 'bcryptjs';
import { getCustomRepository } from "typeorm";
import Customer from "../typeorm/entities/Customer";
import CustomersRepository from "../typeorm/repositories/CustomersRepositories";

interface IRequestData {
  name: string;
  email: string;
}

class CreateCustomerService {
  public async execute({name, email}: IRequestData): Promise<Customer> {
    const customersRepository = getCustomRepository(CustomersRepository);

    const emailExists = await customersRepository.findByEmail(email);

    if(emailExists) {
      throw new AppError('Email address already used');
    }

    const customer = customersRepository.create({
      name,
      email
    });
    await customersRepository.save(customer);
    return customer;
  }
}

export default CreateCustomerService;