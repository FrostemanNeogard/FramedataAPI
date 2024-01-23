import { Module } from '@nestjs/common';
import { FramedataService } from './framedata.service';

@Module({})
export class FramedataModule {
  imports: [FramedataService];
}
