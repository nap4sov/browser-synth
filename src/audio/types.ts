export interface IKeyboardKey {
  play: () => void;
  stop: () => void;
  changeFrequency: () => void;
}

export type TKeyboard = Record<string, IKeyboardKey>;
