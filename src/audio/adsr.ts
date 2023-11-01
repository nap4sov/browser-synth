import Gain from './gain';

export default class ADSR extends Gain {
  constructor(synthCtx: AudioContext, parentGainNode: Gain) {
    super(synthCtx);

    parentGainNode.connectChildNode(this.gainNode);
  }

  connectOscillator = (ocsillator: OscillatorNode) => {
    ocsillator.connect(this.gainNode);
  };
  // TODO: add attack decay sustain release
}
