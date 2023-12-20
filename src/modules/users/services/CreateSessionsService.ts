import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/User";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import { compare, hash } from "bcryptjs";


interface IRequest {
  email: string;
  password: string;
}

class CreateSessionsService {
  public async execute({ email, password }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);
    const user = await usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorret email/password combination.', 401);
    }

    const passordConfirmed = await compare(password, user.password);

    if (!passordConfirmed) {
      throw new AppError('Incorret email/password combination.', 401);
    }

    return user;
  }
}

export default CreateSessionsService;
