import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Logger,
  BadRequestException,
} from '@nestjs/common';
import { Tekken7Service } from './tekken7.service';
import { NotationDto } from 'src/__dtos/notation.dto';

@Controller('tekken7')
export class Tekken7Controller {
  private readonly logger = new Logger();

  constructor(private readonly tekken7Service: Tekken7Service) {}

  @Get(':characterName')
  async getFrameData(@Param('characterName') name: string) {
    try {
      return await this.tekken7Service.getCharacterFrameData(name);
    } catch (error) {
      return new BadRequestException(`${error}`);
    }
  }

  @Post(':characterName')
  async getFrameDataSingle(
    @Param('characterName') name: string,
    @Body() notationDto: NotationDto,
  ) {
    try {
      return await this.tekken7Service.getSingleMoveFrameData(
        name,
        notationDto.input,
      );
    } catch (error) {
      return new BadRequestException(`${error}`);
    }
  }
}
