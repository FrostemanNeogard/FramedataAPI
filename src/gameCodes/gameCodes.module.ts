import { Module } from '@nestjs/common';
import { GameCodesController } from './gameCodes.controller';
import { GameCodesService } from './gameCodes.service';

@Module({
  controllers: [GameCodesController],
  providers: [GameCodesService],
  exports: [GameCodesService],
})
export class GameCodesModule {}
