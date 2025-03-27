import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FrameDataDocument = FrameData & Document;

@Schema()
export class FrameData {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  input: string;

  @Prop({ required: true })
  hit_level: string;

  @Prop({ required: true, type: [String, Number] })
  damage: string | number;

  @Prop({ required: true, type: [String, Number] })
  startup: string | number;

  @Prop({ required: true, type: [String, Number] })
  block: string | number;

  @Prop({ required: true, type: [String, Number] })
  hit: string | number;

  @Prop({ required: true, type: [String, Number] })
  counter: string | number;

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
