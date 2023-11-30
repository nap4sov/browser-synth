export interface IKeyboardKey {
  play: () => void;
  stop: () => void;
  changeFrequency: (value?: number) => void;
  getFrequency: () => number;
}

export type SynthesizerKeyboard = Record<string, IKeyboardKey>;

export interface ControlPanelState {
  master: {
    volume: number;
  };
  oscillator: {
    waveform: OscillatorType;
    distortion: number;
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
    gain: number;
  };
}

export interface ControlPanelControls {
  master: {
    setVolume: (value: number) => void;
  };
  oscillator: {
    setWaveform: (waveform: OscillatorType) => void;
    setDistortion: (amount: number) => void;
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
    setGain: (gain: number) => void;
  };
}
