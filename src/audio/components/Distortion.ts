export default class Distortion {
  private synthCtx: AudioContext;

  private waveShaperNode: WaveShaperNode;

  private distortionAmount = 0;

  constructor(synthCtx: AudioContext) {
    this.synthCtx = synthCtx;
    this.waveShaperNode = synthCtx.createWaveShaper();

    this.waveShaperNode.curve = this.makeDistortionCurve(this.distortionAmount);
    this.waveShaperNode.oversample = '4x';
  }

  // stolen from MDN docs, they found the below distortion curve code on Stack Overflow.
  private makeDistortionCurve = (amount: number) => {
    const samples = this.synthCtx.sampleRate;
    const curve = new Float32Array(samples);
    const deg = Math.PI / 180;

    for (let i = 0; i < samples; i += 1) {
      const x = (i * 2) / samples - 1;
      curve[i] =
        ((3 + amount) * x * 20 * deg) / (Math.PI + amount * Math.abs(x));
    }
    return curve;
  };

  setDistortionAmount = (amount: number) => {
    this.distortionAmount = amount;
    this.waveShaperNode.curve = this.makeDistortionCurve(amount);
  };

  getDistortionAmount = () => {
    return this.distortionAmount;
  };

  connectChildNode = (node: AudioNode) => {
    node.connect(this.waveShaperNode);
  };

  connectParentNode = (node: AudioNode) => {
    this.waveShaperNode.connect(node);
  };
}
