import { useState, useEffect, TouchEventHandler } from 'react';
import './styles.css';

const KEY_WIDTH = 60;

const Keyboard = ({
  keyboard,
}: {
  keyboard: Record<string, { play: () => void; stop: () => void }>;
}) => {
  const [currentNote, setCurrentNote] = useState('');
  const [mousePressed, setMousePressed] = useState(false);

  const handleTouchDrag: TouchEventHandler<HTMLDivElement> = (e) => {
    if (!keyboard) return;

    const x = e.touches[0].pageX;
    const y = e.touches[0].pageY;
    const element = document.elementFromPoint(x, y);
    if (element?.nodeName !== 'BUTTON') return;

    const note = element?.getAttribute('data-note');

    if (!note || note === currentNote) return;

    setCurrentNote(note);
    keyboard[note].play();
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
    window.addEventListener('touchstart', handleMousePressed);
    window.addEventListener('touchend', handleMouseReleased);

    return () => {
      window.removeEventListener('mousedown', handleMousePressed);
      window.removeEventListener('mouseup', handleMouseReleased);
    };
  }, []);

  return (
    <div
      className="keyboard"
      onTouchMove={handleTouchDrag}
      onTouchEnd={() => {
        if (!currentNote || !keyboard) return;

        keyboard[currentNote].stop();
      }}
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
            onTouchStart={() => {
              keyboard[note].play();
            }}
            onTouchEnd={() => {
              keyboard[note].stop();
            }}
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
        );
      })}
    </div>
  );
};

export default Keyboard;
