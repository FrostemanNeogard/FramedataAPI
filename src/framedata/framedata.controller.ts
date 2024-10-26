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
import {
  TekkenMoveCategory,
  tekkenMoveCategories,
} from 'src/__types/moveCategories';

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
      throw new NotFoundException(
        'The given character was not found for the given game.',
      );
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
    if (!tekkenMoveCategories.includes(category)) {
      throw new BadRequestException('Invalid category.');
    }

    const allFramedata = await this.framedataService.getCharacterFrameData(
      characterCode,
      gameCode,
    );

    const filteredMoves = allFramedata.filter((attack) =>
      attack.categories.includes(category),
    );

    const moveInputs = filteredMoves.map((attack) => attack.input);

    if (moveInputs.length == 0) {
      throw new NotFoundException();
    }

    return moveInputs;
  }

  @Post()
  public async getFrameDataSingle(@Body() frameDataDto: FramedataRequestDto) {
    if (!frameDataDto.input) {
      throw new BadRequestException();
    }

    const frameData =
      await this.framedataService.getSingleMoveFrameDataOrSimilarMoves(
        frameDataDto.characterCode,
        frameDataDto.gameCode,
        frameDataDto.input,
      );

    if (frameData.length > 1) {
      throw new NotFoundException({ similar_moves: frameData });
    }

    return frameData;
  }
}
