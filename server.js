import mongoose from 'mongoose';

import { app } from './app.js';

const { DB_HOST } = process.env;

// const DB_HOST =
//   'mongodb+srv://Egor:ZrDGxmsbkdXpuecG@cluster0.ny6nz1n.mongodb.net/Contacts_book?retryWrites=true&w=majority&appName=Cluster0';

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000, () => {
      console.log('Server start');
    });
  })
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  });
