import Gain from './Gain';

export default class ADSR extends Gain {
  private attackTime = 0.2;

  private peakMultiplier = 0.15; // 15% above gain

  private sustainLevel = 1;

  private releaseTime = 0.3;

  private decayTime = 0.1;

  isPlaying = false;

  constructor(synthCtx: AudioContext, parentGainNode: Gain) {
    super(synthCtx);

    parentGainNode.connectChildNode(this.gainNode);
  }

  connectOscillator = (ocsillator: OscillatorNode) => {
    ocsillator.connect(this.gainNode);
  };

  play = () => {
    // reset gain
    this.gainNode.gain.setValueAtTime(0, this.synthCtx.currentTime);

    // ramp to peak
    this.gainNode.gain.linearRampToValueAtTime(
      this.sustainLevel * (1 + this.peakMultiplier),
      this.synthCtx.currentTime + this.attackTime,
    );

    // ramp to sustain level
    this.gainNode.gain.linearRampToValueAtTime(
      this.sustainLevel,
      this.synthCtx.currentTime + this.attackTime + this.decayTime,
    );
  };

  stop = () => {
    // reset gain
    this.gainNode.gain.setValueAtTime(
      this.sustainLevel,
      this.synthCtx.currentTime,
    );

    // release
    this.gainNode.gain.linearRampToValueAtTime(
      0,
      this.synthCtx.currentTime + this.releaseTime,
    );
  };

  setAttackTime = (value: number) => {
    this.attackTime = value;
  };

  getAttackTime = () => {
    return this.attackTime;
  };

  setPeakMultiplier = (value: number) => {
    this.peakMultiplier = value;
  };

  getPeakMultiplier = () => {
    return this.peakMultiplier;
  };

  setDecayTime = (value: number) => {
    this.decayTime = value;
  };

  getDecayTime = () => {
    return this.decayTime;
  };

  setSustainLevel = (value: number) => {
    this.sustainLevel = value;
  };

  getSustainLevel = () => {
    return this.sustainLevel;
  };

  setReleaseTime = (value: number) => {
    this.releaseTime = value;
  };

  getReleaseTime = () => {
    return this.releaseTime;
  };
}
