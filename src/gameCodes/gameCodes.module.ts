import { Module } from '@nestjs/common';
import { GameCodesService } from './gameCodes.service';

@Module({
  providers: [GameCodesService],
})
export class GameCodesModule {}
