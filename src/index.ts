import * as dotenv from 'dotenv';
dotenv.config();
import { App } from './config/app';

const app = App();

const PORT = parseInt(process.env.PORT || '5000');

app.listen(PORT);
