import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import config from '../config/config';
import User, { IUser } from '../models/User';

const options: StrategyOptions = {
   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
   secretOrKey: config.JWT_SECRET
}

export default new Strategy(options, async(payload: IUser, done) => {
   try {
      const user = await User.findById(payload.id);
      if(user) return done(null, user);
      return (null);   
   } catch(err) {
      console.log(err);
   }
});