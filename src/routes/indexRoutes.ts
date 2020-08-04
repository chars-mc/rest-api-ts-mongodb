import { Router } from 'express';
import { ContactRoutes } from './contactRoutes';
import { UserRoutes } from './userRoutes';
import { AuthRoutes } from './authRoutes';
import passport from 'passport';

export class IndexRoutes {
   router: Router;

   constructor() {
      this.router = Router();
      this.routes();
   }

   private routes() {
      this.router.use('/api/contacts', passport.authenticate('jwt', { session: false }), new ContactRoutes().router);
      this.router.use('/api/users', passport.authenticate('jwt', { session: false }), new UserRoutes().router);
      this.router.use('/', new AuthRoutes().router);
   }
}