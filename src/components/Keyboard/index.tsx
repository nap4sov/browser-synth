import { useState, useEffect } from 'react';
import './styles.css';
import { TKeyboard } from 'audio/types';

const KEY_WIDTH = 60;

const Keyboard = ({ keyboard }: { keyboard: TKeyboard }) => {
  const [currentNote, setCurrentNote] = useState('');
  const [mousePressed, setMousePressed] = useState(false);

  const handleNoteChange = (x: number, y: number, isStart: boolean) => {
    const element = document.elementFromPoint(x, y);
    if (element?.nodeName !== 'BUTTON') return;

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

    setCurrentNote('');
    keyboard[currentNote].stop();
  };

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
    <div
      className="keyboard"
      onTouchStart={(e) => {
        handleNoteChange(e.touches[0].pageX, e.touches[0].pageY, true);
      }}
      onTouchMove={(e) => {
        handleNoteChange(e.touches[0].pageX, e.touches[0].pageY, false);
      }}
      onTouchEnd={handleNoteStop}
      onMouseDown={(e) => {
        handleNoteChange(e.clientX, e.clientY, true);
      }}
      onMouseEnter={(e) => {
        if (!mousePressed) return;
        handleNoteChange(e.clientX, e.clientY, false);
      }}
      onMouseMove={(e) => {
        if (!mousePressed) return;
        handleNoteChange(e.clientX, e.clientY, false);
      }}
      onMouseUp={handleNoteStop}
      onMouseLeave={handleNoteStop}
    >
      {Object.keys(keyboard).map((note, idx) => {
        const isBlack =
          idx === 1 || idx === 3 || idx === 6 || idx === 8 || idx === 10;
        return (
          <button
            type="button"
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
  );
};

export default Keyboard;
