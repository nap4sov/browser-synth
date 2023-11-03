import { useEffect, useState } from 'react';
import Synthesizer from 'audio/synthesizer';
import { createSynthesizer } from 'audio';
import Keyboard from 'components/Keyboard';
import Controls from 'components/Controls';

const App = () => {
  const [audioAllowed, setAudioAllowed] = useState(false);
  const [synth, setSynth] = useState<Synthesizer | null>(null);

  useEffect(() => {
    if (!audioAllowed) return;

    const syntesizer = createSynthesizer();
    setSynth(syntesizer);
  }, [audioAllowed]);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        gap: '20px',
        padding: '20px',
      }}
    >
      {!audioAllowed && (
        <button
          type="button"
          style={{ padding: '20px' }}
          onClick={() => {
            setAudioAllowed(true);
          }}
        >
          Allow audio
        </button>
      )}
      {!!synth && <Controls synth={synth} />}
      {!!synth && <Keyboard keyboard={synth.getKeys()} />}
    </div>
  );
};

export default App;
