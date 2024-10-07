import { Module } from '@nestjs/common';
import { FramedataController } from './framedata/framedata.controller';
import { FramedataService } from './framedata/framedata.service';
import { FramedataModule } from './framedata/framedata.module';
import { CharacterCodeController } from './characterCode/characterCode.controller';
import { CharacterCodeService } from './characterCode/characterCode.service';
import { CharacterNameFormatterModule } from './characterCode/characterCode.module';
import { GameCodeModule } from './gameCode/gameCode.module';
import { GameCodeService } from './gameCode/gameCode.service';
import { GameCodesController } from './gameCode/gameCode.controller';

@Module({
  imports: [FramedataModule, CharacterNameFormatterModule, GameCodeModule],
  controllers: [
    FramedataController,
    CharacterCodeController,
    GameCodesController,
  ],
  providers: [FramedataService, CharacterCodeService, GameCodeService],
})
export class AppModule {}
