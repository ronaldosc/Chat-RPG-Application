import { User } from '../model';
import { connectToMongoDB } from '../../../config/mongodb';
import { IUser } from '../interface';
import { ErrorWithStatus } from '../../../utils/errorWithStatus';

export async function create(param: IUser) {
  try {
    await connectToMongoDB();

    const newUser = new User(param);

    await newUser.save();

    return {
      message: 'Usuário adicionado com sucesso!',
      data: {
        newUser,
      },
    };
  } catch (error) {
    let errorStatus: number | null;
    let errorMessage: string | null;
    if (error instanceof ErrorWithStatus) {
      errorStatus = error.getStatus();
      errorMessage = error.message;
    }
    return {
      error: errorStatus ?? 500,
      message: errorMessage ?? 'Erro ao adicionar usuário',
    };
  }
}
