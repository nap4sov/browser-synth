import { ControlPanelControls, ControlPanelState } from 'audio/types';
import Mixer from './Mixer';

export default class ControlPanel {
  private state: ControlPanelState;

  private controls: ControlPanelControls;

  constructor(mixer: Mixer) {
    const {
      masterVolume,
      oscillators: multiosc,
      lfo,
      filter,
    } = mixer.getModules();

    const oscillators = Object.values(multiosc);

    this.state = {
      master: {
        volume: 0,
      },
      oscillator: {
        waveform: oscillators[0].getWaveform(),
        distortion: oscillators[0].getDistortion(),
      },
      adsr: {
        attack: oscillators[0].getEnvelope().getAttackTime(),
        decay: oscillators[0].getEnvelope().getDecayTime(),
        sustainLevel: oscillators[0].getEnvelope().getSustainLevel(),
        peak: oscillators[0].getEnvelope().getPeakMultiplier(),
        release: oscillators[0].getEnvelope().getReleaseTime(),
      },
      lfo: {
        speed: 0,
        amount: 0,
      },
      filter: {
        type: filter.getType(),
        q: filter.getQ(),
        freq: filter.getFrequency(),
        gain: filter.getGain(),
      },
    };

    this.controls = {
      master: {
        setVolume: (value) => {
          if (value < -1 || value > 0.2) return;

          masterVolume.setLevel(value);
          this.state.master.volume = value;
        },
      },
      oscillator: {
        setWaveform: (waveform) => {
          oscillators.forEach((osc) => {
            osc.setWaveform(waveform);
          });
          this.state.oscillator.waveform = oscillators[0].getWaveform();
        },
        setDistortion: (amount) => {
          oscillators.forEach((osc) => {
            osc.setDistortion(amount);
          });
          this.state.oscillator.distortion = oscillators[0].getDistortion();
        },
      },
      adsr: {
        setAttack: (attackTime) => {
          oscillators.forEach((osc) => {
            osc.getEnvelope().setAttackTime(attackTime);
          });
          this.state.adsr.attack = attackTime;
        },
        setDecay: (decayTime) => {
          oscillators.forEach((osc) => {
            osc.getEnvelope().setDecayTime(decayTime);
          });
          this.state.adsr.decay = decayTime;
        },
        setSustainLevel: (sustainLevel) => {
          oscillators.forEach((osc) => {
            osc.getEnvelope().setSustainLevel(sustainLevel);
          });
          this.state.adsr.sustainLevel = sustainLevel;
        },
        setPeak: (peakMultiplier) => {
          oscillators.forEach((osc) => {
            osc.getEnvelope().setPeakMultiplier(peakMultiplier);
          });
          this.state.adsr.peak = peakMultiplier;
        },
        setRelease: (releaseTime) => {
          oscillators.forEach((osc) => {
            osc.getEnvelope().setReleaseTime(releaseTime);
          });
          this.state.adsr.release = releaseTime;
        },
      },
      lfo: {
        setSpeed: (speed) => {
          lfo.setSpeed(speed);
          this.state.lfo.speed = speed;
        },
        setAmount: (amount) => {
          lfo.setAmount(amount);
          this.state.lfo.amount = amount;
        },
        turnOff: () => {
          lfo.resetLfo();
        },
      },
      filter: {
        setType: (type) => {
          filter.setType(type);
        },
        setQ: (q) => {
          filter.setQ(q);
        },
        setFrequency: (freq) => {
          filter.setFrequency(freq);
        },
        setGain: (gain) => {
          filter.setGain(gain);
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
