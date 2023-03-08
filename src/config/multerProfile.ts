import multer from 'multer';
import { AuthenticatedUserDataRequest } from '../interfaces';

const storage = multer.diskStorage({
  destination: function (req: AuthenticatedUserDataRequest, file, cb) {
    cb(null, './images/uploads/');
  },
  filename: function (req: AuthenticatedUserDataRequest, file, cb) {
    const extensaoArquivo = file.originalname.split('.').slice(-1)[0];
    const novoNomeArquivo = req.userId;
    cb(null, `${novoNomeArquivo}.${extensaoArquivo}`);
  }
});

function imageFilter(req: AuthenticatedUserDataRequest, file, cb): void {
  if (file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg') {
    cb(null, true);
  } else {
    req.invalidFile = true;
    cb(null, false, req.invalidFile);
  }
}

const upload = multer({ storage, fileFilter: imageFilter });

export default upload;
