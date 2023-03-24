import { Request, Response } from 'express';
import { IUser } from '../interface';
import * as userServices from '../services';
import { EmailValidator, NameValidator, PasswordValidator } from '../../../utils/validators';

export async function createUser(req: Request, res: Response): Promise<void> {
  const userData: IUser = req.body;

  const valEmail = new EmailValidator(userData.email);
  const valPwd = new PasswordValidator(userData.password);
  const valName = new NameValidator(userData.contact.userName);

  if(valEmail.errors){
    res.status(500).json(`Email:${valEmail.errors}`);
    return;
  }
  if(valName.errors){
    res.status(500).json(`Nome:${valName.errors}`);
    return
  }
  if(valPwd.errors){
    res.status(500).json(`Senha:${valPwd.errors}. A senha deve conter pelo menos 6 caracteres`);
    return
  }

  const result = await userServices.create(userData);

  if (!result.error) {
    res.status(200).json(result);
    return;
  }

  res.status(result.error).json(result.message);
  return;
}
