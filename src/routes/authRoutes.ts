import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import User, { IUser } from '../models/User';
import config from '../config/config';

export class AuthRoutes {
   router: Router;

   constructor() {
      this.router = Router();
      this.routes();
   }

   private routes() {
      this.router.post('/signup', this.signUp);
      this.router.post('/signin', this.signIn.bind(this));
   }

   private async signUp(req: Request, res: Response) {
      const { name, email, password, username } = req.body;

      if(!name || !email || !password || !username) return res.status(400).json({ message: 'All fields are required' });

      if(await User.findOne({email: email})) return res.status(400).json({ message: 'User already exists' });

      const newUser = new User(req.body);
      await newUser.save();
      res.status(201).json(newUser);;
   }
   
   private async signIn(req: Request, res: Response) {
      if(!req.body.username || !req.body.password) return res.status(400).json({ message: 'Username and password are required' });

      const user = await User.findOne({username: req.body.username});
      if(!user) return res.status(400).send('User doesn\'t exists');

      const isMatch:boolean = await user.comparePassword(req.body.password);
      if(isMatch) return res.status(200).json({ token: this.createToken(user) });
      
      res.status(400).json({ message: 'Email or password are incorrect' });
   }

   private createToken(user: IUser) {
      return jwt.sign({
         id: user.id,
         username: user.username
      }, config.JWT_SECRET!, {
         expiresIn: 86400
      });
   }
}