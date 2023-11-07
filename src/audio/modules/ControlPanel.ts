import { ControlPanelControls, ControlPanelState } from 'audio/types';
import Gain from './Gain';
import LFO from './LFO';
import Oscillator from './Oscillator';

export default class ControlPanel {
  private state: ControlPanelState;

  private controls: ControlPanelControls;

  constructor(gain: Gain, oscillator: Oscillator, lfo: LFO) {
    this.state = {
      master: {
        volume: 0,
      },
      oscillator: {
        freq: oscillator.getFrequency(),
        waveform: oscillator.getWaveform(),
      },
      lfo: {
        speed: 0,
        amount: 0,
      },
    };

    this.controls = {
      master: {
        setVolume: (value: number) => {
          if (value < -1 || value > 0.2) return;

          gain.setLevel(value);
          this.state.master.volume = value;
        },
      },
      oscillator: {
        setFrequency: (freq: number) => {
          oscillator.setFrequency(freq);
          this.state.oscillator.freq = oscillator.getFrequency();
        },
        setWaveform: (waveform: OscillatorType) => {
          oscillator.setWaveform(waveform);
          this.state.oscillator.waveform = oscillator.getWaveform();
        },
      },
      lfo: {
        setSpeed: (speed: number) => {
          lfo.setSpeed(speed);
          this.state.lfo.speed = speed;
        },
        setAmount: (amount: number) => {
          lfo.setAmount(amount);
          this.state.lfo.amount = amount;
        },
        turnOff: () => {
          lfo.resetLfo();
        },
      },
    };
  }

  getControls = () => {
    return this.controls;
  };

  getState = () => {
    return this.state;
  };
}
