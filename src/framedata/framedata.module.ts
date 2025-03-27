import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FramedataController } from './framedata.controller';
import { FramedataService } from './framedata.service';
import { FrameData, FrameDataSchema } from './schemas/framedata.schema';
import { CharacterCodesModule } from '../characterCodes/characterCodes.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: FrameData.name, schema: FrameDataSchema },
    ]),
    CharacterCodesModule,
  ],
  controllers: [FramedataController],
  providers: [FramedataService],
  exports: [FramedataService],
})
export class FramedataModule {}
