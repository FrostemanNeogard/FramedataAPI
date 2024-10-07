import { Injectable, Logger } from '@nestjs/common';
import { CharacterCodesForGameMap } from 'src/__types/characterCode';
import * as CharacterCodesData from '../__data/characterCodes.json';
import { GameCode } from 'src/__types/gameCode';

@Injectable()
export class CharacterCodesService {
  private readonly logger: Logger;
  private readonly allCharacterCodesMap: CharacterCodesForGameMap[];

  constructor() {
    this.logger = new Logger();
    this.allCharacterCodesMap = this.generateCharacterCodesMap();
  }

  private generateCharacterCodesMap(): CharacterCodesForGameMap[] {
    const result: CharacterCodesForGameMap[] = [];

    for (const [game, characters] of Object.entries(CharacterCodesData)) {
      result[game] = {};
      for (const [groupKey, names] of Object.entries(characters)) {
        for (const name of names) {
          result[game][name] = groupKey;
        }
      }
    }

    return result;
  }

  public getCharacterCode(characterName: string, gameCode: GameCode) {
    this.logger.log(
      `Fetching character code for ${characterName} in ${gameCode}`,
    );

    const formattedCharacterName =
      this.allCharacterCodesMap[gameCode][characterName];
    if (!formattedCharacterName) {
      this.logger.error(`Couldn't format character name: ${characterName}.`);
      return null;
    }

    return formattedCharacterName;
  }
}
