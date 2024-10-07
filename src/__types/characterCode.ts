export type CharacterCode = { characterCode: string };

export type CharacterCodesForGame = {
  gameCode: string;
  characterCodes: CharacterCode[];
};

export type CharacterCodesForGameMap = {
  gameCode: string;
  characterCodeMaps: { [key: string]: string };
};
