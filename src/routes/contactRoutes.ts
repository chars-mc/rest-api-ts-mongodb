import { Router, Request, Response } from 'express';

import Contact from '../models/Contact';

export class ContactRoutes {
   router: Router;

   constructor() {
      this.router = Router();
      this.routes();
   }

   private routes() {
      this.router.get('/', this.getContacts);
      this.router.get('/:url', this.getContact);
      this.router.post('/', this.createContact);
      this.router.put('/:url', this.updateContact);
      this.router.delete('/:url', this.deleteContact);
   }

   private async getContacts(req: Request, res: Response) {
      const contacts = await Contact.find();
      res.json(contacts);
   }

   private async getContact(req: Request, res: Response) {
      const contact = await Contact.findOne({url: req.params.url});
      res.json(contact);
   }
   
   private async createContact(req: Request, res: Response) {
      const { name, url, email, phone, photo } = req.body;
      const newContact = new Contact({name, url, email, phone, photo});
      
      await newContact.save();
      res.json({data: newContact});
   }

   private async updateContact(req: Request, res: Response) {
      const contact = await Contact.findOneAndUpdate({url: req.params.url}, req.body, { new: true});

      res.json(contact);
   }

   private async deleteContact(req: Request, res: Response) {
      await Contact.findOneAndDelete({url: req.params.url});
      res.json({message: 'Contact deleted'});
   }
}