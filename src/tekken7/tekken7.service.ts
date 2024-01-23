import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import * as fs from 'fs';
import { FrameDataType } from 'src/__types/frame_data';
import { promisify } from 'util';

@Injectable()
export class Tekken7Service {
  private readonly logger = new Logger();

  private readonly characterCodes = {
    akuma: 'akuma',
    alisa: 'alisa',
    anna: 'anna',
    armor_king: 'armor-king',
    asuka: 'asuka',
    bob: 'bob',
    bryan: 'bryan',
    claudio: 'claudio',
    devil_jin: 'devil-jin',
    dragunov: 'dragunov',
    eddy: 'eddy',
    eliza: 'eliza',
    fahkumram: 'fahkumram',
    feng: 'feng',
    ganryu: 'ganryu',
    geese: 'geese',
    gigas: 'gigas',
    heihachi: 'heihachi',
    hwoarang: 'hwoarang',
    jack_7: 'jack7',
    jin: 'jin',
    josie: 'josie',
    julia: 'julia',
    katarina: 'katarina',
    kazumi: 'kazumi',
    kazuya: 'kazuya',
    king: 'king',
    kuma: 'kuma',
    panda: 'kuma',
    kunimitsu: 'kunimitsu',
    lars: 'lars',
    law: 'law',
    lee: 'lee',
    lei: 'lei',
    leo: 'leo',
    leroy: 'leroy',
    lidia: 'lidia',
    lili: 'lili',
    lucky_chloe: 'lucky-chloe',
    marduk: 'marduk',
    master_raven: 'master-raven',
    miguel: 'miguel',
    negan: 'negan',
    nina: 'nina',
    noctis: 'noctis',
    paul: 'paul',
    shaheen: 'shaheen',
    steve: 'steve',
    xiaoyu: 'xiaoyu',
    yoshimitsu: 'yoshimitsu',
    zafina: 'zafina',
  };

  async getCharacterFrameData(characterName: string): Promise<FrameDataType[]> {
    const characterCode = this.characterCodes[characterName];

    if (!characterCode) {
      this.logger.error(`Couldn't find character name: ${characterName}`);
      throw new BadRequestException(`Invalid character name.`);
    }

    const filePath = `src/data/tekken7/${characterCode}.json`;

    try {
      const readFileAsync = promisify(fs.readFile);
      const data = await readFileAsync(filePath, 'utf8');
      const jsonData = JSON.parse(data);
      return jsonData;
    } catch (error) {
      this.logger.error(
        `An error occurred when reading ${filePath}. ${error.code}: ${error.message}`,
      );
      throw new BadRequestException(`Error reading file.`);
    }
  }

  async getSingleMoveFrameData(characterName: string, notation: string) {
    this.logger.log(
      `Attempting to find attack: ${notation} for character: ${characterName}.`,
    );

    const frameData = await this.getCharacterFrameData(characterName);
    let attackInfo: FrameDataType[] = [];

    for (let i = 0; i < 2; i++) {
      const removePlus = i > 0;
      const formattedNotation = this.formatNotation(notation, removePlus);
      attackInfo = frameData.filter(
        (item) =>
          this.formatNotation(item.input, removePlus) === formattedNotation,
      );
    }
    if (!attackInfo[0]) {
      this.logger.error(`Couldn't find attack: ${notation}`);
      return new BadRequestException(`No attack found.`);
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
      .replaceAll(/ *\([^)]*\) */g, '')
      .split('or')
      .pop()
      .replace(/[\s,:/()]/g, '');

    if (removePlus) {
      modifiedNotation = modifiedNotation.replaceAll(/\+/g, '');
    }

    return modifiedNotation;
  }
}
