export default class LFO {
  private synthCtx: AudioContext;

  private lfo: OscillatorNode;

  private lfoGain: GainNode;

  constructor(synthCtx: AudioContext) {
    this.synthCtx = synthCtx;
    this.lfo = synthCtx.createOscillator();
    this.lfoGain = synthCtx.createGain();
    this.lfo.connect(this.lfoGain);
    this.resetLfo();
    this.lfo.start(0);
  }

  resetLfo = () => {
    this.lfo.frequency.setValueAtTime(0, 0);
    this.lfoGain.gain.setValueAtTime(0, 0);
  };

  getGainNode = () => {
    return this.lfoGain;
  };

  setSpeed = (speed: number) => {
    this.lfo.frequency.setValueAtTime(speed, this.synthCtx.currentTime);
  };

  setAmount = (amount: number) => {
    this.lfoGain.gain.setValueAtTime(amount, this.synthCtx.currentTime);
  };
}
