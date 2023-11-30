import { ControlPanel, Mixer } from './modules';
import { notes } from './constants';
import { SynthesizerKeyboard } from './types';

export default class Synthesizer {
  private mixer: Mixer;

  private controlPanel: ControlPanel;

  private keys: SynthesizerKeyboard;

  constructor(
    audioContext: AudioContext,
    customNotes: { freq: number; note: string }[],
  ) {
    const notesArray = customNotes.length ? customNotes : notes;

    this.mixer = new Mixer(
      audioContext,
      notesArray.map(({ freq }) => freq),
    );

    this.mixer.getMixerOut().connect(audioContext.destination);
    const { oscillators } = this.mixer.getModules();

    this.controlPanel = new ControlPanel(this.mixer);

    this.keys = notesArray.reduce((acc, { note, freq }) => {
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
          changeFrequency: (value?: number) => {
            oscillator.setFrequency(value || freq);
          },
          getFrequency: () => {
            return freq;
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
