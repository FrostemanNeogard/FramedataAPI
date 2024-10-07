import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { CharacterCodesService } from './characterCodes.service';
import { GameCode } from 'src/__types/gameCode';
import { CharacterCodeDto } from './dtos/characterCodeDto';
import { GameCodesService } from 'src/gameCodes/gameCodes.service';

@Controller('charactercodes')
export class CharacterCodesController {
  constructor(
    private characterCodesService: CharacterCodesService,
    private gameCodesService: GameCodesService,
  ) {}

  @Get(':gameCode/:characterName')
  public formatCharacterName(
    @Param('gameCode') gameName: string,
    @Param('characterName') characterName: string,
  ): CharacterCodeDto {
    const gameCode: GameCode | null =
      this.gameCodesService.getGameCode(gameName);
    if (gameCode == null) {
      throw new NotFoundException("Couldn't find the given game.");
    }

    const characterCode = this.characterCodesService.getCharacterCode(
      characterName,
      gameCode,
    );
    if (characterCode == null) {
      throw new NotFoundException("Couldn't find the given character.");
    }

    return new CharacterCodeDto(characterCode);
  }
}
