import { ILoginUser } from '@interfaces';
import { connectToMongoDB } from '@config';
import { User } from '@models';
import { Err, ErrorWithStatus } from '@utils';

export async function login({ email, password }: ILoginUser) {
  const userAlreadyExists = await User.findOne({ email }).select('password').exec();

  try {
    await connectToMongoDB();

    if (!userAlreadyExists) {
      throw new ErrorWithStatus('Usuário com esse e-mail não existe.', 400);
    }

    if (!userAlreadyExists.validPassword(password)) {
      throw new ErrorWithStatus('Senha incorreta!', 400);
    }

    return {
      message: 'Usuário logado com sucesso!',
      data: { _id: userAlreadyExists._id },
    };
  } catch (error: unknown) {
    let err: Err;
    if (error instanceof ErrorWithStatus) {
      err = { errorStatus: error.getStatus(), errorMessage: error.message };
    }
    return {
      error: err.errorStatus ?? 500,
      message: err.errorMessage ?? 'Erro ao fazer login',
    };
  }
}
