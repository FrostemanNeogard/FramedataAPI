import { Module } from '@nestjs/common';
import { Tekken7Service } from './tekken7.service';

@Module({})
export class Tekken7Module {
  imports: [Tekken7Service];
}
