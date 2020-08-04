import { Schema, model } from 'mongoose';

const UserSchema =  new Schema({
   name: {
      type: String,
      required: true
   },
   email: {
      type: String,
      required: true,
      unique: true
   },
   password: {
      type: String,
      required: true
   },
   username: {
      type: String,
      required: true,
      unique: true
   },
   createdAt: {
      type: Date,
      default: Date.now()
   },
   contacts: [{
      type: Schema.Types.ObjectId,
      ref: 'Contact'
   }]
});


export default model('User', UserSchema);