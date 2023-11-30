import { SynthesizerKeyboard } from 'audio/types';

export const KEY_WIDTH = 60;

export const getKeyboardByOctaves = (keyboard: SynthesizerKeyboard) => {
  const allKeys = Object.keys(keyboard);
  const allOctaves = [];
  let currentOctave = [];
  let keyNum = 0;

  for (let k = 0; k < allKeys.length; k += 1) {
    keyNum += 1;

    const note = allKeys[k];
    currentOctave.push({ [note]: keyboard[note] });
    if (keyNum === 12) {
      keyNum = 0;
      allOctaves.push(currentOctave);
      currentOctave = [];
    }
    if (k === allKeys.length - 1) {
      allOctaves.push(currentOctave);
    }
  }

  return allOctaves;
};

export const getKeyProps = (
  note: string,
  keyIndex: number,
  octaveIndex: number,
) => {
  const isBlack = note.includes('#');
  const octaveWidth = octaveIndex * KEY_WIDTH * 7;
  const leftOffset =
    (KEY_WIDTH / 2) * keyIndex +
    KEY_WIDTH / 4 +
    (keyIndex >= 6 ? KEY_WIDTH / 2 : 0) +
    octaveWidth;

  return {
    isBlack,
    leftOffset,
    width: isBlack ? KEY_WIDTH / 2 : KEY_WIDTH,
  };
};
