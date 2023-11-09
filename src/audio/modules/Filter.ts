class Filter {
  private synthCtx: AudioContext;

  private filterNode: BiquadFilterNode;

  q = 0;

  gain = 0;

  frequency = 0;

  constructor(synthCtx: AudioContext) {
    this.synthCtx = synthCtx;
    this.filterNode = synthCtx.createBiquadFilter();
    this.initialize();
  }

  private initialize = () => {
    this.filterNode.Q.setValueAtTime(this.q, this.synthCtx.currentTime);
    this.filterNode.gain.setValueAtTime(this.gain, this.synthCtx.currentTime);
    this.filterNode.frequency.setValueAtTime(
      this.frequency,
      this.synthCtx.currentTime,
    );
    this.filterNode.type = 'highpass';
  };

  setQ = (value: number) => {
    this.q = value;
    this.filterNode.Q.setValueAtTime(value, this.synthCtx.currentTime);
  };

  getQ = () => {
    return this.q;
  };

  setGain = (value: number) => {
    this.gain = value;
    this.filterNode.gain.setValueAtTime(value, this.synthCtx.currentTime);
  };

  getGain = () => {
    return this.gain;
  };

  setFrequency = (value: number) => {
    this.frequency = value;
    this.filterNode.frequency.setValueAtTime(value, this.synthCtx.currentTime);
  };

  getFrequency = () => {
    return this.frequency;
  };

  setType = (type: BiquadFilterType) => {
    this.filterNode.type = type;
  };

  getType = () => {
    return this.filterNode.type;
  };

  getFilterNode = () => {
    return this.filterNode;
  };
}

export default Filter;
