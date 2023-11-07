export interface IKeyboardKey {
  play: () => void;
  stop: () => void;
  changeFrequency: () => void;
}

export type SynthesizerKeyboard = Record<string, IKeyboardKey>;

export interface ControlPanelState {
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

export interface ControlPanelControls {
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
