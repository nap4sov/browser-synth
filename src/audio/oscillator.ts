import ADSR from './adsr';
import Gain from './gain';

export default class Oscillator {
  private osc: OscillatorNode;

  private adsr: ADSR;

  constructor(
    synthCtx: AudioContext,
    parentGainNode: Gain,
    freq: number,
    type: OscillatorType,
  ) {
    this.osc = synthCtx.createOscillator();
    this.adsr = new ADSR(synthCtx, parentGainNode);
    this.osc.type = type;
    this.osc.frequency.setValueAtTime(freq, synthCtx.currentTime);

    this.adsr.connectOscillator(this.osc);
    this.osc.start();
  }

  play = () => {
    this.adsr.setLevel(1);
  };

  stop = () => {
    this.adsr.setLevel(0);
  };

  changeWaveform = (newType: OscillatorType) => {
    this.osc.type = newType;
  };
}
