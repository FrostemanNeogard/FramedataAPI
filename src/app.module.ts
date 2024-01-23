import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Tekken7Controller } from './tekken7/tekken7.controller';
import { Tekken7Service } from './tekken7/tekken7.service';
import { Tekken7Module } from './tekken7/tekken7.module';
import { CharacterNameFormatterController } from './character_name_formatter/character_name_formatter.controller';
import { CharacterNameFormatterService } from './character_name_formatter/character_name_formatter.service';
import { CharacterNameFormatterModule } from './character_name_formatter/character_name_formatter.module';

@Module({
  imports: [Tekken7Module, CharacterNameFormatterModule],
  controllers: [AppController, Tekken7Controller, CharacterNameFormatterController],
  providers: [AppService, Tekken7Service, CharacterNameFormatterService],
})
export class AppModule {}
