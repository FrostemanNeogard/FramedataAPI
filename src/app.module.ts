import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FramedataController } from './framedata/framedata.controller';
import { FramedataService } from './framedata/framedata.service';
import { FramedataModule } from './framedata/framedata.module';
import { CharacterCodeController } from './characterCode/characterCode.controller';
import { CharacterCodeService } from './characterCode/characterCode.service';
import { CharacterNameFormatterModule } from './characterCode/characterCode.module';

@Module({
  imports: [FramedataModule, CharacterNameFormatterModule],
  controllers: [AppController, FramedataController, CharacterCodeController],
  providers: [AppService, FramedataService, CharacterCodeService],
})
export class AppModule {}
