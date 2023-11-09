import { ControlPanel, Mixer } from './modules';
import { notes } from './constants';
import { SynthesizerKeyboard } from './types';

export default class Synthesizer {
  private mixer: Mixer;

  private controlPanel: ControlPanel;

  private keys: SynthesizerKeyboard;

  constructor(audioContext: AudioContext) {
    this.mixer = new Mixer(
      audioContext,
      notes.map(({ freq }) => freq),
    );

    this.mixer.getMixerOut().connect(audioContext.destination);
    const { oscillators } = this.mixer.getModules();

    this.controlPanel = new ControlPanel(this.mixer);

    this.keys = notes.reduce((acc, { note, freq }) => {
      const oscillator = oscillators[freq];
      return {
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
      };
    }, {});
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
