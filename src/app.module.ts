import { Module } from '@nestjs/common';
import { FramedataController } from './framedata/framedata.controller';
import { FramedataService } from './framedata/framedata.service';
import { FramedataModule } from './framedata/framedata.module';
import { CharacterCodeController } from './characterCode/characterCode.controller';
import { CharacterCodeService } from './characterCode/characterCode.service';
import { CharacterNameFormatterModule } from './characterCode/characterCode.module';

@Module({
  imports: [FramedataModule, CharacterNameFormatterModule],
  controllers: [FramedataController, CharacterCodeController],
  providers: [FramedataService, CharacterCodeService],
})
export class AppModule {}
