import { ControlPanel, Gain, LFO, Oscillator } from './modules';
import { notes } from './constants';

export default class Synthesizer {
  private osc: Oscillator;

  private lfo: LFO;

  private masterVolume: Gain;

  private controlPanel: ControlPanel;

  private keys: Record<string, { play: () => void; stop: () => void }>;

  constructor(audioContext: AudioContext) {
    this.masterVolume = new Gain(audioContext);
    this.masterVolume.setLevel(0);

    this.osc = new Oscillator(audioContext, this.masterVolume, 220);

    this.lfo = new LFO(audioContext);

    this.osc.connectToLfo(this.lfo.getGainNode());
    this.osc.initStart();

    this.controlPanel = new ControlPanel(this.masterVolume, this.osc, this.lfo);

    this.keys = notes.reduce(
      (acc, { note, freq }) => ({
        ...acc,
        [note]: {
          play: () => {
            this.osc.setFrequency(freq);
            this.osc.play();
          },
          stop: () => {
            this.osc.stop();
          },
        },
      }),
      {},
    );
  }

  getKeys = () => {
    return this.keys;
  };

  getControls = () => {
    return this.controlPanel.getControls();
  };

  getControlsState = () => {
    return this.controlPanel.getState();
  };
}
