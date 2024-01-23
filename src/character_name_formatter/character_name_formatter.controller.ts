import { Controller, Get, Param } from '@nestjs/common';
import { CharacterNameFormatterService } from './character_name_formatter.service';

@Controller('character-name-formatter')
export class CharacterNameFormatterController {
  constructor(
    private characterNameFormatterService: CharacterNameFormatterService,
  ) {}

  @Get(':characterName')
  async formatCharacterName(@Param('characterName') name: string) {
    return await this.characterNameFormatterService.formatCharacterName(name);
  }
}
