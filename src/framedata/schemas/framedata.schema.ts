import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { FramedataPatchDto } from 'src/__dtos/frameDataDto';

export type FrameDataDocument = FrameData & Document;

@Schema()
export class FrameData {
  constructor(framedataPatchDto: FramedataPatchDto) {
    this.name = framedataPatchDto.name;
    this.input = framedataPatchDto.input;
    this.hit_level = framedataPatchDto.hit_level;
    this.damage = framedataPatchDto.damage;
    this.startup = framedataPatchDto.startup;
    this.block = framedataPatchDto.block;
    this.hit = framedataPatchDto.hit;
    this.counter = framedataPatchDto.counter;
    this.alternateInputs = framedataPatchDto.alternateInputs;
    this.categories = framedataPatchDto.categories;
    this.notes = framedataPatchDto.notes;
    this.game = framedataPatchDto.game;
    this.characterCode = framedataPatchDto.characterCode;
  }

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  input: string;

  @Prop({ required: true })
  hit_level: string;

  @Prop({ required: true })
  damage: string;

  @Prop({ required: true })
  startup: string;

  @Prop({ required: true })
  block: string;

  @Prop({ required: true })
  hit: string;

  @Prop({ required: true })
  counter: string;

  @Prop({ required: true, type: [String] })
  alternateInputs: string[];

  @Prop({ required: true, type: [String] })
  categories: string[];

  @Prop({ required: true, type: [String] })
  notes: string[];

  @Prop({ required: true })
  game: string;

  @Prop({ required: true })
  characterCode: string;
}

export const FrameDataSchema = SchemaFactory.createForClass(FrameData);
