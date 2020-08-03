import { Request, Response, Router } from 'express';

export class IndexRoutes {
   router: Router;

   constructor() {
      this.router = Router();
      this.routes();
   }

   private routes() {
      this.router.get('/', (req: Request, res: Response) => {
         res.send('Welcome');
      });
   }
}