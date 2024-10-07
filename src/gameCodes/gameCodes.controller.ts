import { Controller, Get } from '@nestjs/common';
import { GameCodesService } from './gameCodes.service';
import { GameCode } from 'src/__types/gameCode';

@Controller('gamecodes')
export class GameCodesController {
  constructor(private readonly gameCodesService: GameCodesService) {}

  @Get()
  public getAllGameCodes(): GameCode[] {
    return this.gameCodesService.getAllGameCodes();
  }
}
