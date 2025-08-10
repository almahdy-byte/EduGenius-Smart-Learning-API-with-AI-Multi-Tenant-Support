import { Module } from '@nestjs/common';
import { AuthModule } from './Auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv'

dotenv.config()


@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI as string ),
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
