/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { ErrorWithStatus } from '../../../utils/errorWithStatus';
import { connectToMongoDB } from '../../../config/mongodb';
import { ILoginUser } from '../interface';
import { User } from '../model';

export async function login(param: ILoginUser) {
  try {
    await connectToMongoDB();

    if (typeof param.email !== 'string') {
      throw new ErrorWithStatus('E-mail inválido.', 400);
    }
    const userAlreadyExists = await User.findOne({ email: { $eq: param.email } }).select('password').exec();

    if (!userAlreadyExists) {
      throw new ErrorWithStatus('Usuário com esse e-mail não existe.', 400);
    }

    if (userAlreadyExists.validPassword(param.password)) {
      return {
        message: 'Usuário logado com sucesso!',
        data: { _id: userAlreadyExists._id },
      };
    }

    throw new ErrorWithStatus('Senha incorreta!', 400);
  } catch (error) {
    let errorStatus: number | null;
    let errorMessage: string | null;
    if (error instanceof ErrorWithStatus) {
      errorStatus = error.getStatus();
      errorMessage = error.message;
    }
    return {
      error: errorStatus ?? 500,
      message: errorMessage ?? 'Erro ao fazer login',
    };
  }
}
