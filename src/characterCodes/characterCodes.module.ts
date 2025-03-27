import { Module } from '@nestjs/common';
import { CharacterCodesController } from './characterCodes.controller';
import { CharacterCodesService } from './characterCodes.service';
import { GameCodesModule } from '../gameCodes/gameCodes.module';

@Module({
  imports: [GameCodesModule],
  controllers: [CharacterCodesController],
  providers: [CharacterCodesService],
  exports: [CharacterCodesService],
})
export class CharacterCodesModule {}
