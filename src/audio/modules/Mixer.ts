import Filter from './Filter';
import Gain from './Gain';
import LFO from './LFO';
import Oscillator from './Oscillator';

class Mixer {
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

    this.masterVolume.setLevel(0);
    this.masterVolume.connectChildNode(this.mixerOut);

    this.oscillators = oscillatorFrequencies.reduce((acc, freq) => {
      const osc = new Oscillator(synthCtx, freq);
      this.connectOscillator(osc);
      return { ...acc, [freq]: osc };
    }, {});
  }

  connectOscillator = (osc: Oscillator) => {
    osc.connectParentNode(this.mixerOut);
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

export default Mixer;
