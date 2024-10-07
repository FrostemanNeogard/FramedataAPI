import { Controller, Get } from '@nestjs/common';
import { GameCodeService } from './gameCode.service';
import { GameCode } from 'src/__types/gameCode';

@Controller('gamecodes')
export class GameCodesController {
  constructor(private readonly gameCodesService: GameCodeService) {}

  @Get()
  public getAllGameCodes(): GameCode[] {
    return this.gameCodesService.getAllGameCodes();
  }
}
