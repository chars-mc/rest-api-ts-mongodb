import { Router, Request, Response, response } from 'express';

import User from '../models/User';

export class UserRoutes {
   router: Router;

   constructor() {
      this.router = Router();
      this.routes();
   }

   private routes() {
      this.router.get('/', this.getUsers);
      this.router.get('/:username', this.getUser);
      this.router.post('/', this.createUser);
      this.router.put('/:username', this.updateUser);
      this.router.delete('/:username', this.deleteUser);
   }
   
   private async getUsers(req: Request, res: Response) {
      const users = await User.find();
      res.json(users);
   }

   private async getUser(req: Request, res: Response) {
      const user = await User.find({username: req.params.username}).populate('contacts',);

      res.json(user);
   }
   
   private async createUser(req: Request, res: Response) {
      const newUser = new User(req.body);

      await newUser.save();
      res.json({data: newUser});
   }

   private async updateUser(req: Request, res: Response) {
      const user = await User.findOneAndUpdate({username: req.params.username}, req.body, { new: true }).populate('contacts');

      res.json(user);
   }

   private async deleteUser(req: Request, res: Response) {
      await User.findOneAndDelete({username: req.params.username});

      res.json({message: 'User deleted'});
   }
}