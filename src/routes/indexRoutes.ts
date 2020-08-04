import { Request, Response, Router } from 'express';
import { ContactRoutes } from './contactRoutes';
import { UserRoutes } from './userRoutes';

export class IndexRoutes {
   router: Router;

   constructor() {
      this.router = Router();
      this.routes();
   }

   private routes() {
      this.router.use('/api/contacts', new ContactRoutes().router);
      this.router.use('/api/users', new UserRoutes().router);
   }
}