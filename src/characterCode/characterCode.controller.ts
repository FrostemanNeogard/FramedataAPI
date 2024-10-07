import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { CharacterCodeService } from './characterCode.service';
import { GameCode } from 'src/__types/gameCode';
import { CharacterCodeDto } from './dtos/characterCodeDto';
import { GameCodeService } from 'src/gameCode/gameCode.service';

@Controller('charactercode')
export class CharacterCodeController {
  constructor(
    private characterCodeService: CharacterCodeService,
    private gameCodeService: GameCodeService,
  ) {}

  @Get(':gameCode/:characterName')
  public formatCharacterName(
    @Param('gameCode') gameName: string,
    @Param('characterName') characterName: string,
  ): CharacterCodeDto {
    const gameCode: GameCode | null =
      this.gameCodeService.getGameCode(gameName);
    if (gameCode == null) {
      throw new NotFoundException("Couldn't find the given game.");
    }

    const characterCode = this.characterCodeService.getCharacterCode(
      characterName,
      gameCode,
    );
    if (characterCode == null) {
      throw new NotFoundException("Couldn't find the given character.");
    }

    return new CharacterCodeDto(characterCode);
  }
}
