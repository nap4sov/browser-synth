import Synthesizer from './synthesizer';

export const createSynthesizer = (
  customNotes?: { freq: number; note: string }[],
) => {
  const audioContext = new AudioContext();
  return new Synthesizer(audioContext, customNotes || []);
};
