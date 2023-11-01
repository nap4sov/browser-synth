import { useEffect, useState } from 'react';
import Synthesizer from 'audio/synthesizer';

const waveforms = ['sine', 'sawtooth', 'square', 'triangle'];

const App = () => {
  const [audioAllowed, setAudioAllowed] = useState(false);
  const [mousePressed, setMousePressed] = useState(false);
  const [synth, setSynth] = useState<Synthesizer | null>(null);

  const keyboard = synth?.getKeys();

  useEffect(() => {
    const handleMousePressed = () => {
      setMousePressed(true);
    };
    const handleMouseReleased = () => {
      setMousePressed(false);
    };
    window.addEventListener('mousedown', handleMousePressed);
    window.addEventListener('mouseup', handleMouseReleased);

    return () => {
      window.removeEventListener('mousedown', handleMousePressed);
      window.removeEventListener('mouseup', handleMouseReleased);
    };
  }, []);

  return (
    <div>
      <div
        style={{
          display: 'flex',
          gap: '10px',
          marginTop: '10px',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {audioAllowed ? (
          <>
            <span>Waveform</span>
            <select
              onChange={({ target }) => {
                if (!synth) return;
                synth.changeWaveform(target.value as OscillatorType);
              }}
            >
              {waveforms.map((wfm) => (
                <option value={wfm} key={wfm}>
                  {wfm}
                </option>
              ))}
            </select>
            <span style={{ marginLeft: '20px' }}>Volume</span>
            <input
              type="range"
              min={-1}
              max={0.2}
              step={0.01}
              onChange={(e) => {
                if (!synth) return;
                synth.setVolume(Number(e.target.value as string));
              }}
            />
          </>
        ) : (
          <button
            type="button"
            style={{ padding: '20px' }}
            onClick={() => {
              setSynth(new Synthesizer());
              setAudioAllowed(true);
            }}
          >
            Allow audio
          </button>
        )}
      </div>
      <div
        style={{
          display: 'flex',
          gap: '10px',
          marginTop: '20px',
          justifyContent: 'center',
        }}
      >
        {audioAllowed &&
          !!keyboard &&
          Object.keys(keyboard).map((note) => (
            <button
              type="button"
              key={note}
              style={{ padding: '24px 8px' }}
              onMouseDown={() => {
                keyboard[note].play();
              }}
              onMouseUp={() => {
                keyboard[note].stop();
              }}
              onMouseEnter={() => {
                if (!mousePressed) return;

                keyboard[note].play();
              }}
              onMouseLeave={() => {
                keyboard[note].stop();
              }}
            >
              {note}
            </button>
          ))}
      </div>
    </div>
  );
};

export default App;
