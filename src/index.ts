import { App } from './app';
require('dotenv').config();
import './database';

(async function main() {
   const app = new App();

   await app.listen();
}());