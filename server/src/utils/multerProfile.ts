// import multer from 'multer';
// import { AuthenticatedUserDataRequestModel} from '../interfaces';

// const storage = multer.diskStorage({
//   destination: function (req: AuthenticatedUserDataRequestModel, file, cb) {
//     cb(null, './images/uploads/');
//   },
//   filename: function (req: AuthenticatedUserDataRequestModel, file, cb) {
//     const extensaoArquivo = file.originalname.split('.').slice(-1)[0];
//     const novoNomeArquivo = req.userId;
//     cb(null, `${novoNomeArquivo}.${extensaoArquivo}`);
//   }
// });

// function imageFilter(req: AuthenticatedUserDataRequestModel, file, cb): void {
//   if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
//     cb(null, true);
//   } else {
//     req.invalidFile = true;
//     cb(null, false, req.invalidFile);
//   }
// }

// const upload = multer({ storage, fileFilter: imageFilter });

// export default upload;
