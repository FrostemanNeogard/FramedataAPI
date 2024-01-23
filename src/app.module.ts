import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Tekken7Controller } from './tekken7/tekken7.controller';
import { Tekken7Service } from './tekken7/tekken7.service';
import { Tekken7Module } from './tekken7/tekken7.module';
import { CharacterCodeController } from './character-code/character-code.controller';
import { CharacterCodeService } from './character-code/character-code.service';
import { CharacterNameFormatterModule } from './character-code/character-code.module';

@Module({
  imports: [Tekken7Module, CharacterNameFormatterModule],
  controllers: [AppController, Tekken7Controller, CharacterCodeController],
  providers: [AppService, Tekken7Service, CharacterCodeService],
})
export class AppModule {}
