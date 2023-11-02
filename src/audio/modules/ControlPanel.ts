import Gain from './Gain';
import LFO from './LFO';
import Oscillator from './Oscillator';

interface ControlPanelState {
  master: {
    volume: number;
  };
  oscillator: {
    freq: number;
    waveform: OscillatorType;
  };
  lfo: {
    speed: number;
    amount: number;
  };
}

interface ControlPanelControls {
  master: {
    setVolume: (value: number) => void;
  };
  oscillator: {
    setFrequency: (value: number) => void;
    setWaveform: (waveform: OscillatorType) => void;
  };
  lfo: {
    setSpeed: (speed: number) => void;
    setAmount: (amount: number) => void;
    turnOff: () => void;
  };
}

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
