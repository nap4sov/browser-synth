import notes from './constants/notes';
import Gain from './gain';
import Oscillator from './oscillator';

export default class Synthesizer {
  private ctx: AudioContext | null;

  private keys: Record<string, Oscillator>;

  private masterVolume: Gain;

  constructor(waveform: OscillatorType = 'sine') {
    const context = new AudioContext();
    this.ctx = context;
    this.masterVolume = new Gain(context);
    this.masterVolume.setLevel(0);
    this.keys = notes.reduce(
      (acc, { note, freq }) => ({
        ...acc,
        [note]: new Oscillator(context, this.masterVolume, freq, waveform),
      }),
      {},
    );
  }

  getKeys = () => {
    return this.keys;
  };

  changeWaveform = (newType: OscillatorType) => {
    Object.keys(this.keys).forEach((key) => {
      this.keys[key].changeWaveform(newType);
    });
  };

  setVolume = (value: number) => {
    if (value < -1 || value > 0.2) return;

    this.masterVolume.setLevel(value);
  };

  getVolume = () => {
    return this.masterVolume.getCurrentValue();
  };
}
