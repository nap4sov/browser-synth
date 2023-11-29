import { Filter, Gain, LFO, Oscillator } from 'audio/components';

export default class Mixer {
  private synthCtx: AudioContext;

  private mixerOut: StereoPannerNode;

  private oscillators: Record<number, Oscillator>;

  private lfo: LFO;

  private masterVolume: Gain;

  private filter: Filter;

  constructor(synthCtx: AudioContext, oscillatorFrequencies: number[] = [440]) {
    this.synthCtx = synthCtx;
    this.mixerOut = synthCtx.createStereoPanner();
    this.masterVolume = new Gain(synthCtx);
    this.filter = new Filter(synthCtx);
    this.lfo = new LFO(synthCtx);

    // connect filter to master volume
    this.filter.getFilterNode().connect(this.masterVolume.getGainNode());
    // connect master volume to mixer out
    this.masterVolume.connectParentNode(this.mixerOut);

    this.masterVolume.setLevel(1);

    this.oscillators = oscillatorFrequencies.reduce((acc, freq) => {
      const osc = new Oscillator(synthCtx, freq);
      this.connectOscillator(osc);
      return { ...acc, [freq]: osc };
    }, {});
  }

  connectOscillator = (osc: Oscillator) => {
    // connect all oscillators to filter
    osc.connectParentNode(this.filter.getFilterNode());
    // connect lfo to all oscillators
    osc.connectToLfo(this.lfo.getGainNode());
    osc.initStart();
  };

  getModules = () => {
    return {
      lfo: this.lfo,
      masterVolume: this.masterVolume,
      filter: this.filter,
      oscillators: this.oscillators,
    };
  };

  getMixerOut = () => {
    return this.mixerOut;
  };
}
