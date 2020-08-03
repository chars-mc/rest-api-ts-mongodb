import mongoose, { ConnectionOptions } from 'mongoose';
import config from './config/config';

const DB_OPTIONS: ConnectionOptions = {
   useNewUrlParser: true,
   useUnifiedTopology: true
}

mongoose.connect(config.DB.URI!, DB_OPTIONS);

const connection = mongoose.connection;

connection.once('open', () => {
   console.log('MongoDB is connected');
});

connection.on('error', (err) => {
   console.error(err);
   process.exit(0);
});