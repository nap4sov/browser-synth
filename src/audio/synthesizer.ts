import { ControlPanel, Filter, Gain, LFO, Mixer, Oscillator } from './modules';
import { notes } from './constants';
import { SynthesizerKeyboard } from './types';

export default class Synthesizer {
  private mixer: Mixer;

  private controlPanel: ControlPanel;

  private keys: SynthesizerKeyboard;

  constructor(audioContext: AudioContext) {
    this.mixer = new Mixer(
      audioContext,
      new Gain(audioContext),
      new Oscillator(audioContext, 440),
      new Filter(audioContext),
      new LFO(audioContext),
    );

    this.mixer.getSource().connect(audioContext.destination);
    const { oscillator } = this.mixer.getModules();

    this.controlPanel = new ControlPanel(this.mixer);

    this.keys = notes.reduce(
      (acc, { note, freq }) => ({
        ...acc,
        [note]: {
          play: () => {
            oscillator.setFrequency(freq);
            oscillator.play();
          },
          stop: () => {
            oscillator.stop();
          },
          changeFrequency: () => {
            oscillator.setFrequency(freq);
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
