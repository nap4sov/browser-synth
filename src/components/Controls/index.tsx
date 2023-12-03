import { Synthesizer, waveforms, filterTypes } from 'browser-synth-sdk';
import { ControlsBlock, Knob } from 'components/UiKit';

const Controls = ({ synth }: { synth: Synthesizer }) => {
  const controls = synth.getControls();
  const initialState = synth.getControlsState();

  return (
    <div
      style={{
        display: 'grid',
        marginTop: '10px',
        gridTemplateColumns: '1fr 1fr',
      }}
    >
      <div>
        <ControlsBlock
          label="Master"
          elements={[
            <Knob
              label="Volume"
              initialValue={initialState.master.volume}
              handleChange={(value) => {
                controls.master.setVolume(value);
              }}
              range={{ min: 0, max: 1 }}
              key="master volume"
            />,
            <Knob
              label="Distortion"
              initialValue={initialState.oscillator.distortion}
              handleChange={(value) => {
                controls.oscillator.setDistortion(value);
              }}
              range={{ min: 0, max: 100 }}
              key="distortion"
            />,
            <div key="waveform">
              <p>Waveform</p>
              <select
                onChange={({ target }) => {
                  if (!controls) return;
                  controls.oscillator.setWaveform(
                    target.value as OscillatorType,
                  );
                }}
              >
                {waveforms.map((wfm) => (
                  <option value={wfm} key={wfm}>
                    {wfm}
                  </option>
                ))}
              </select>
            </div>,
            <div key="filter-type">
              <p>Filter Type</p>
              <select
                onChange={({ target }) => {
                  if (!controls) return;
                  controls.filter.setType(target.value as BiquadFilterType);
                }}
              >
                {filterTypes.map((type) => (
                  <option value={type} key={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>,
          ]}
        />
        <ControlsBlock
          label="Filter"
          elements={[
            <Knob
              label="Q"
              initialValue={initialState.filter.q}
              range={{ min: 0, max: 3 }}
              handleChange={(value) => controls.filter.setQ(value)}
              key="filter-q"
            />,
            <Knob
              label="Frequency"
              initialValue={initialState.filter.freq}
              range={{ min: 0, max: 20000 }}
              handleChange={(value) => controls.filter.setFrequency(value)}
              key="filter-freq"
            />,
          ]}
        />
      </div>
      <div>
        <ControlsBlock
          label="Envelope"
          elements={[
            <Knob
              label="Attack"
              initialValue={initialState.adsr.attack}
              range={{ min: 0.01, max: 1 }}
              handleChange={(value) => controls.adsr.setAttack(value)}
              key="attack"
            />,
            <Knob
              label="Decay"
              initialValue={initialState.adsr.decay}
              range={{ min: 0.01, max: 1 }}
              handleChange={(value) => controls.adsr.setDecay(value)}
              key="decay"
            />,
            <Knob
              label="Sustain"
              initialValue={initialState.adsr.release}
              range={{ min: 0.01, max: 1 }}
              handleChange={(value) => controls.adsr.setRelease(value)}
              key="sustain"
            />,
            <Knob
              label="Peak"
              initialValue={initialState.adsr.peak}
              range={{ min: 0.01, max: 1 }}
              handleChange={(value) => controls.adsr.setPeak(value)}
              key="release"
            />,
          ]}
        />
        <ControlsBlock
          label="LFO"
          elements={[
            <Knob
              label="Level"
              initialValue={initialState.lfo.amount}
              range={{ min: 0, max: 5 }}
              handleChange={(value) => controls.lfo.setAmount(value)}
              key="lfo level"
            />,
            <Knob
              label="Speed"
              initialValue={initialState.lfo.speed}
              range={{ min: 0.01, max: 10 }}
              handleChange={(value) => controls.lfo.setSpeed(value)}
              key="lfo speed"
            />,
          ]}
        />
      </div>
    </div>
  );
};

export default Controls;
