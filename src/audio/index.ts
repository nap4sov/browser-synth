import Synthesizer from './synthesizer';

export const createSynthesizer = () => {
  const audioContext = new AudioContext();
  return new Synthesizer(audioContext);
};
