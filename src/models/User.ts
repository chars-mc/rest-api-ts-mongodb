import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser extends Document {
   name: string,
   email: string,
   password: string,
   username: string,
   createdAt: Date,
   contacts: [Schema.Types.ObjectId],
   comparePassword: (password: string) => Promise<boolean>
}

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

UserSchema.pre<IUser>('save', async function(next) {
   if(!this.isModified('password')) return next();

   const salt = await bcrypt.genSalt(10);
   const hash = await bcrypt.hash(this.password, salt);
   this.password = hash;
   console.log(hash);
   next();
});

UserSchema.methods.comparePassword = async function(password: string): Promise<boolean> {
   return await bcrypt.compare(password, this.password);
};

export default model<IUser>('User', UserSchema);