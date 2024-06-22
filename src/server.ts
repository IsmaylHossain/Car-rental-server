
import mongoose from 'mongoose';
import app from './app';

import config from './app/configs';


async function main() {
  try {

    await mongoose.connect(config.database_url as string);
    
    app.listen(process.env.PORT || config.port, () => {
      console.log(`app is listening on PORT ${config.port}`);
    });
  } catch (err) {

     console.log(err);
  }
}

main();