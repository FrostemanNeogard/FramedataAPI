import {
  Controller,
  Post,
  Body,
  Logger,
  BadRequestException,
  Get,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { FramedataService } from './framedata.service';
import { FramedataRequestDto } from 'src/__dtos/frameDataDto';
import { GameCode } from 'src/__types/gameCode';
import { CharacterCodesService } from 'src/characterCodes/characterCodes.service';
import { TekkenMoveCategory } from 'src/__types/moveCategories';

@Controller('framedata')
export class FramedataController {
  private readonly logger = new Logger();

  constructor(
    private readonly framedataService: FramedataService,
    private readonly characterCodesService: CharacterCodesService,
  ) {}

  @Get(':gameCode/:characterCode')
  public async getFramedataForCharacter(
    @Param('gameCode') gameCode: GameCode,
    @Param('characterCode') characterName: string,
  ) {
    const characterCode = this.characterCodesService.getCharacterCode(
      characterName,
      gameCode,
    );

    if (characterCode == null) {
      this.logger.log(
        `Couldn't find character code for: ${characterName} in game: ${gameCode}`,
      );
      throw new NotFoundException();
    }

    this.logger.log(
      `Returning all character data for character: ${characterName} in game: ${gameCode}`,
    );

    return await this.framedataService.getCharacterFrameData(
      characterCode,
      gameCode,
    );
  }

  @Get(':gameCode/:characterCode/:category')
  public async getMoveCategoryForCharacter(
    @Param('gameCode') gameCode: GameCode,
    @Param('characterCode') characterCode: string,
    @Param('category') category: TekkenMoveCategory,
  ) {
    const allFramedata = await this.framedataService.getCharacterFrameData(
      characterCode,
      gameCode,
    );

    const filteredMoves = allFramedata.filter((attack) =>
      attack.categories.includes(category),
    );

    const moveInputs = filteredMoves.map((attack) => attack.input);

    return moveInputs;
  }

  @Post()
  public async getFrameDataSingle(@Body() frameDataDto: FramedataRequestDto) {
    this.logger.log('');

    try {
      return await this.framedataService.getSingleMoveFrameData(
        frameDataDto.characterCode,
        frameDataDto.gameCode,
        frameDataDto.input,
      );
    } catch (error) {
      return new BadRequestException(`${error}`);
    }
  }
}
