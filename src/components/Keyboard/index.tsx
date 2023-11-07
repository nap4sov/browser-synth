import { useState, useEffect } from 'react';
import './styles.css';
import { SynthesizerKeyboard } from 'audio/types';

const KEY_WIDTH = 60;

const Keyboard = ({ keyboard }: { keyboard: SynthesizerKeyboard }) => {
  const [currentNote, setCurrentNote] = useState('');
  const [pointerPressed, setPointerPressed] = useState(false);

  const handleNoteChange = (x: number, y: number, isStart: boolean) => {
    const element = document.elementFromPoint(x, y);
    const note = element?.getAttribute('data-note');

    if (!note || note === currentNote) return;

    setCurrentNote(note);
    if (isStart) {
      keyboard[note].play();
    } else {
      keyboard[note].changeFrequency();
    }
  };

  const handleNoteStop = () => {
    if (!currentNote) return;

    keyboard[currentNote].stop();
    setCurrentNote('');
  };

  useEffect(() => {
    const handlePointerPressed = () => {
      setPointerPressed(true);
    };
    const handlePointerReleased = () => {
      setPointerPressed(false);
    };
    window.addEventListener('pointerdown', handlePointerPressed);
    window.addEventListener('pointerup', handlePointerReleased);

    return () => {
      window.removeEventListener('pointerdown', handlePointerPressed);
      window.removeEventListener('pointerup', handlePointerReleased);
    };
  }, []);

  return (
    <div className="keyboard-wrapper">
      <div
        className="keyboard"
        onPointerDown={(e) => {
          handleNoteChange(e.clientX, e.clientY, true);
        }}
        onPointerEnter={(e) => {
          if (!pointerPressed) return;
          handleNoteChange(e.clientX, e.clientY, false);
        }}
        onPointerMove={(e) => {
          if (!pointerPressed) return;
          handleNoteChange(e.clientX, e.clientY, false);
        }}
        onPointerUp={handleNoteStop}
        onPointerLeave={handleNoteStop}
        onPointerCancel={handleNoteStop}
      >
        {Object.keys(keyboard).map((note, idx) => {
          const isBlack =
            idx === 1 || idx === 3 || idx === 6 || idx === 8 || idx === 10;
          return (
            <div
              key={note}
              data-note={note}
              className={isBlack ? 'note black' : 'note white'}
              style={{
                left:
                  (KEY_WIDTH / 2) * idx +
                  KEY_WIDTH / 4 +
                  (idx >= 6 ? KEY_WIDTH / 2 : 0),
                width: isBlack ? KEY_WIDTH / 2 : KEY_WIDTH,
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Keyboard;
