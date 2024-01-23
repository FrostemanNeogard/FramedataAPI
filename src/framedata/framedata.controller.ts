import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Logger,
  BadRequestException,
} from '@nestjs/common';
import { FramedataService } from './framedata.service';
import { FramedataRequestDto } from 'src/__dtos/frame_data_dto';

@Controller('framedata')
export class FramedataController {
  private readonly logger = new Logger();

  constructor(private readonly tekken7Service: FramedataService) {}

  @Get(':characterName')
  async getFrameData(@Param('characterName') name: string) {
    try {
      return await this.tekken7Service.getCharacterFrameData(name, 'tekken7');
    } catch (error) {
      return new BadRequestException(`${error}`);
    }
  }

  @Post()
  async getFrameDataSingle(@Body() frameDataDto: FramedataRequestDto) {
    try {
      if (frameDataDto.input) {
        return await this.tekken7Service.getSingleMoveFrameData(
          frameDataDto.characterCode,
          frameDataDto.gameCode,
          frameDataDto.input,
        );
      } else {
        return await this.tekken7Service.getCharacterFrameData(
          frameDataDto.characterCode,
          frameDataDto.gameCode,
        );
      }
    } catch (error) {
      return new BadRequestException(`${error}`);
    }
  }
}
