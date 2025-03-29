import { GameCode } from 'src/__types/gameCode';
import { FrameData } from 'src/framedata/schemas/framedata.schema';

export class FramedataRequestDto {
  gameCode: GameCode;
  characterCode: string;
  input: string;
}

export class FramedataPatchDto extends FrameData {}
