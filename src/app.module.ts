import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FramedataController } from './framedata/framedata.controller';
import { FramedataService } from './framedata/framedata.service';
import { FramedataModule } from './framedata/framedata.module';
import { CharacterCodeController } from './character-code/character-code.controller';
import { CharacterCodeService } from './character-code/character-code.service';
import { CharacterNameFormatterModule } from './character-code/character-code.module';

@Module({
  imports: [FramedataModule, CharacterNameFormatterModule],
  controllers: [AppController, FramedataController, CharacterCodeController],
  providers: [AppService, FramedataService, CharacterCodeService],
})
export class AppModule {}
