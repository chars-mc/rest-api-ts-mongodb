import express, { Application, Router } from 'express';
import morgan from 'morgan';
import cors from 'cors';

import { IndexRoutes } from './routes/indexRoutes';

export class App {
   private app: Application;
   private router: Router;

   constructor(private port?: number | string) {
      this.app = express();
      this.router = new IndexRoutes().router;

      this.settings();
      this.middlewares();
      this.routes();
   }

   async listen() {
      await this.app.listen(this.app.get('port'));
      console.log(`server on port ${this.app.get('port')}`);
   }

   private settings() {
      this.app.set('port', this.port || process.env.PORT || 3000);
   }

   private middlewares() {
      this.app.use(morgan('dev'));
      this.app.use(express.urlencoded({extended: false}));
      this.app.use(express.json());
      this.app.use(cors());
   }

   private routes() {
      this.app.use(this.router);
   }
}