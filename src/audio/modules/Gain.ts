export default class Gain {
  protected gainNode: GainNode;

  protected synthCtx: AudioContext;

  constructor(synthCtx: AudioContext) {
    this.gainNode = synthCtx.createGain();
    this.synthCtx = synthCtx;

    this.gainNode.gain.setValueAtTime(0, synthCtx.currentTime);
    this.gainNode.connect(synthCtx.destination);
  }

  setLevel = (value: number) => {
    this.gainNode.gain.setTargetAtTime(value, this.synthCtx.currentTime, 0.02);
  };

  connectChildNode = (childNode: AudioNode) => {
    childNode.connect(this.gainNode);
  };
}
