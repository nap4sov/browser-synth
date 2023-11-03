import Synthesizer from 'audio/synthesizer';
import { waveforms } from 'audio/constants';
import { Knob } from 'components/UiKit';

const Controls = ({ synth }: { synth: Synthesizer }) => {
  const controls = synth.getControls();
  const initialState = synth.getControlsState();

  return (
    <div
      style={{
        display: 'flex',
        gap: '10px',
        marginTop: '10px',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <span>Waveform</span>
      <select
        onChange={({ target }) => {
          if (!controls) return;
          controls.oscillator.setWaveform(target.value as OscillatorType);
        }}
      >
        {waveforms.map((wfm) => (
          <option value={wfm} key={wfm}>
            {wfm}
          </option>
        ))}
      </select>

      <Knob
        label="Volume"
        initialValue={initialState.master.volume}
        handleChange={(value) => {
          controls.master.setVolume(value);
        }}
        range={{ min: -1, max: 0.2 }}
      />

      <Knob
        label="LFO level"
        initialValue={initialState.lfo.amount}
        range={{ min: 0, max: 5 }}
        handleChange={(value) => controls.lfo.setAmount(value)}
      />

      <Knob
        label="LFO speed"
        initialValue={initialState.lfo.speed}
        range={{ min: 0.01, max: 10 }}
        handleChange={(value) => controls.lfo.setSpeed(value)}
      />
    </div>
  );
};

export default Controls;
