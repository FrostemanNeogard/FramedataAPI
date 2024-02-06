import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import * as fs from 'fs';
import { FrameDataType } from 'src/__types/frame_data';
import { promisify } from 'util';

@Injectable()
export class FramedataService {
  private readonly logger = new Logger();

  async getCharacterFrameData(
    characterCode: string,
    game: string,
  ): Promise<FrameDataType[]> {
    if (!characterCode) {
      this.logger.error(`No character name given.`);
      throw new BadRequestException(`Invalid character name.`);
    }

    if (!game) {
      this.logger.error(`No game name given.`);
      throw new BadRequestException(`Invalid game name.`);
    }

    const filePath = `src/data/${game}/${characterCode}.json`;

    try {
      const readFileAsync = promisify(fs.readFile);
      const data = await readFileAsync(filePath, 'utf8');
      const jsonData = JSON.parse(data);
      return jsonData;
    } catch (error) {
      this.logger.error(
        `An error occurred when reading ${filePath}. ${error.code}: ${error.message}`,
      );
      throw new BadRequestException(
        `No framedata was found for the given character and game combo.`,
      );
    }
  }

  async getSingleMoveFrameData(
    character: string,
    game: string,
    notation: string,
  ) {
    this.logger.log(
      `Attempting to find attack: ${notation} for character: ${character} in ${game}.`,
    );

    const frameData = await this.getCharacterFrameData(character, game);
    let attackInfo: FrameDataType[] = [];

    for (let i = 0; i < 2; i++) {
      const removePlus = i > 0;
      const formattedNotation = this.formatNotation(notation, removePlus);
      attackInfo = frameData.filter(
        (item) =>
          this.formatNotation(item.input, removePlus) === formattedNotation,
      );
      if (!!attackInfo[0]) {
        break;
      }
    }
    if (!attackInfo[0]) {
      this.logger.error(`Couldn't find attack: ${notation}`);
      throw new BadRequestException(`No data found for the given attack.`);
    }
    this.logger.log(`Found attack: ${attackInfo[0].input}`);
    return attackInfo[0];
  }

  private formatNotation(inputNotation: string, removePlus: boolean): string {
    let modifiedNotation = inputNotation
      .toLowerCase()

      // TODO: This is kinda stupid, maybe move the input shortcuts to a different function
      .replaceAll('cd', 'f,n,d,df')
      .replaceAll('debug', 'b,db,d,df')
      .replaceAll('gs', 'f,n,b,db,d,df,f')
      .replaceAll('wr', 'f,f,f')
      .replaceAll('qcf', 'd,df,f')
      .replaceAll('qcb', 'd,db,b')
      .replaceAll('hcf', 'b,db,f,df,f')
      .replaceAll('hcb', 'f,df,d,db,d')
      .replaceAll('ewgf', 'f,n,d,df:2')
      .replaceAll('heatsmash', 'in heat 2+3')
      .replaceAll('heatburst', '2+3')
      .replaceAll('.', '')
      .replaceAll(/ *\([^)]*\) */g, '')
      .split('or')
      .pop()
      .replace(/[\s,/()]/g, '');

    if (removePlus) {
      modifiedNotation = modifiedNotation.replaceAll(/\+/g, '');
    }

    return modifiedNotation;
  }
}
