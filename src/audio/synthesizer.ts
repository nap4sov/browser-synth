import { ControlPanel, Gain, LFO, Oscillator } from './modules';
import notes from './constants/notes';

export default class Synthesizer {
  private osc: Oscillator;

  private lfo: LFO;

  private masterVolume: Gain;

  private controlPanel: ControlPanel;

  private keys: Record<string, { play: () => void; stop: () => void }>;

  constructor(waveform: OscillatorType = 'sine') {
    const context = new AudioContext();

    this.masterVolume = new Gain(context);
    this.masterVolume.setLevel(0);

    this.osc = new Oscillator(context, this.masterVolume, 220, waveform);

    this.lfo = new LFO(context);

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
