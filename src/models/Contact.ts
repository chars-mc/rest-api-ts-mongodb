import { Schema, model } from 'mongoose';

const contactSchema = new Schema({
   name: {
      type: String,
      required: true
   },
   url: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
   },
   email: {
      type: String,
      required: true
   },
   phone: {
      type: Number,
      required: true
   },
   photo: {
      type: String
   },
   createdAt:{
      type: Date,
      default: Date.now()
   },
   updatedAt: Date
});

export default model('Contact', contactSchema);