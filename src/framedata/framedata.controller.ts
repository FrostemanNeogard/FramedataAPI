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
