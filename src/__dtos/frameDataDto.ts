import { GameCode } from 'src/__types/gameCode';

export class FramedataRequestDto {
  gameCode: GameCode;
  characterCode: string;
  input: string;
}
