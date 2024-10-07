import { Injectable } from '@nestjs/common';
import { GameCode, validGameCodes } from 'src/__types/gameCode';

@Injectable()
export class GameCodeService {
  public getGameCode(gameName: string): GameCode | null {
    if (!validGameCodes.includes(gameName as GameCode)) {
      return null;
    }

    return validGameCodes[gameName];
  }
}
