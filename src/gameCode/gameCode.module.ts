import { Module } from '@nestjs/common';
import { GameCodeService } from './gameCode.service';

@Module({
  providers: [GameCodeService],
})
export class GameCodeModule {}
