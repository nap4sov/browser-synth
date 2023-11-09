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
  adsr: {
    attack: number;
    decay: number;
    sustainLevel: number;
    peak: number;
    release: number;
  };
  lfo: {
    speed: number;
    amount: number;
  };
  filter: {
    type: BiquadFilterType;
    q: number;
    freq: number;
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
  adsr: {
    setAttack: (attackTime: number) => void;
    setDecay: (decayTime: number) => void;
    setSustainLevel: (sustainLevel: number) => void;
    setPeak: (peakMultiplier: number) => void;
    setRelease: (releaseTime: number) => void;
  };
  lfo: {
    setSpeed: (speed: number) => void;
    setAmount: (amount: number) => void;
    turnOff: () => void;
  };
  filter: {
    setType: (type: BiquadFilterType) => void;
    setQ: (q: number) => void;
    setFrequency: (freq: number) => void;
  };
}
