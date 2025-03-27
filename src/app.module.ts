import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FramedataModule } from './framedata/framedata.module';
import { CharacterCodesModule } from './characterCodes/characterCodes.module';
import { GameCodesModule } from './gameCodes/gameCodes.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.MONGODB_URI || 'mongodb://localhost:27017/tekken-framedata',
    ),
    FramedataModule,
    CharacterCodesModule,
    GameCodesModule,
  ],
})
export class AppModule {}
