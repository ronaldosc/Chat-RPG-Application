import { IUser } from '@interfaces';
import { connectToMongoDB } from '@config';
import { User } from '@models';
import { Err, ErrorWithStatus } from '@utils';

export async function create({ email, contact, password }: IUser) {
  const userAlreadyExists = await User.findOne({ email }).exec();

  try {
    await connectToMongoDB();

    if (userAlreadyExists) {
      throw new ErrorWithStatus('Usuário com esse email já existe', 522);
    }

    const newUser = new User();
    Object.assign(newUser, { email, contact, password: newUser.setPassword(password) });

    await newUser.save();

    return {
      message: 'Usuário adicionado com sucesso!',
      data: {},
    };
  } catch (error: unknown) {
    let err: Err;
    if (error instanceof ErrorWithStatus) {
      err = { errorStatus: error.getStatus(), errorMessage: error.message };
    }
    return {
      error: err.errorStatus ?? 500,
      message: err.errorMessage ?? 'Erro ao adicionar usuário',
    };
  }
}
