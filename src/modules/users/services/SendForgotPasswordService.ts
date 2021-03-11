import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import path from 'path';
import UsersRepository from "../typeorm/repositories/UsersRepository";
import UsersTokensRepository from "../typeorm/repositories/UsersTokensRepository";
import EtherealMail from '@config/mail/EtherealMail'

interface IRequestData {
  email: string;
}

class SendForgotPasswordService {
  public async execute({ email }: IRequestData): Promise<void> {
    const usersRepository = getCustomRepository(UsersRepository);
    const userTokenRepository = getCustomRepository(UsersTokensRepository);

    const user = await usersRepository.findByEmail(email);

    if(!user) {
      throw new AppError('User does not exists.');
    }

    const { token } = await userTokenRepository.generate(Number(user?.id));

    const forgotPasswordTemplate = path.resolve(__dirname, '..', 'views', 'forgot_password.hbs');

    await EtherealMail.sendEmail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: '[PUBJAIZ] = Recuperação de senha',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.name,
          link: `${process.env.APP_WEB_URL}/reset_password?token=${token}`,
        }
      },
    });
  }
}

export default SendForgotPasswordService;
