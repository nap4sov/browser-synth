import ADSR from './ADSR';

export default class Oscillator {
  private synthCtx: AudioContext;

  private osc: OscillatorNode;

  private adsr: ADSR;

  private frequency: number;

  private glideTime = 0.01;

  constructor(
    synthCtx: AudioContext,
    freq: number,
    type: OscillatorType = 'sine',
  ) {
    this.synthCtx = synthCtx;
    this.osc = synthCtx.createOscillator();
    this.adsr = new ADSR(synthCtx);

    this.frequency = freq;
    this.synthCtx = synthCtx;

    this.setWaveform(type);
  }

  initStart = () => {
    this.setFrequency(this.frequency);
    this.adsr.connectOscillator(this.osc);
    this.osc.start();
  };

  connectParentNode = (parentNode: AudioNode) => {
    this.adsr.connectParentNode(parentNode);
  };

  play = () => {
    this.adsr.play();
  };

  stop = () => {
    this.adsr.stop();
  };

  setWaveform = (newType: OscillatorType) => {
    this.osc.type = newType;
  };

  getWaveform = () => {
    return this.osc.type;
  };

  setFrequency = (freq: number) => {
    this.frequency = freq;
    this.osc.frequency.exponentialRampToValueAtTime(
      freq,
      this.synthCtx.currentTime + this.glideTime,
    );
  };

  getFrequency = () => {
    return this.frequency;
  };

  connectToLfo = (lfoGain: GainNode) => {
    lfoGain.connect(this.osc.frequency);
  };

  getEnvelope = () => {
    return this.adsr;
  };
}
