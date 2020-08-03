import { Request, Response, Router } from 'express';
import { ContactRoutes } from './contactRoutes';

export class IndexRoutes {
   router: Router;

   constructor() {
      this.router = Router();
      this.routes();
   }

   private routes() {
      this.router.use('/api/contacts', new ContactRoutes().router);
   }
}