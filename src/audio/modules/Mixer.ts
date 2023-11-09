import Filter from './Filter';
import Gain from './Gain';
import LFO from './LFO';
import Oscillator from './Oscillator';

class Mixer {
  private synthCtx: AudioContext;

  private osc: Oscillator;

  private lfo: LFO;

  private masterVolume: Gain;

  private filter: Filter;

  constructor(
    synthCtx: AudioContext,
    masterVolume: Gain,
    oscillator: Oscillator,
    filter: Filter,
    lfo: LFO,
  ) {
    this.synthCtx = synthCtx;
    this.masterVolume = masterVolume;
    this.osc = oscillator;
    this.filter = filter;
    this.lfo = lfo;

    this.osc.connectToLfo(this.lfo.getGainNode());
    this.osc.initStart();
  }

  getModules = () => {
    return {
      oscillator: this.osc,
      lfo: this.lfo,
      masterVolume: this.masterVolume,
      filter: this.filter,
    };
  };
}

export default Mixer;
