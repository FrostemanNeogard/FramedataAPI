import { Controller, Get, Param } from '@nestjs/common';
import { CharacterCodeService } from './character-code.service';

@Controller('character-code')
export class CharacterCodeController {
  constructor(private characterCodeService: CharacterCodeService) {}

  @Get(':characterName')
  async formatCharacterName(@Param('characterName') name: string) {
    return await this.characterCodeService.formatCharacterName(name);
  }
}
