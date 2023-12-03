import { PointerEventHandler } from 'react';
import './styles.css';
import { SynthesizerKeyboard } from 'browser-synth-sdk/dist/types';
import { getKeyboardByOctaves, getKeyProps } from './helpers';

const currentNotes = new Map<number, string>();

const Keyboard = ({ keyboard }: { keyboard: SynthesizerKeyboard }) => {
  const handleNotesChange: PointerEventHandler<HTMLDivElement> = ({
    clientX,
    clientY,
    pointerId,
    nativeEvent,
  }) => {
    // pointer event combined with pointer id allows multitouch handling on any device
    const element = document.elementFromPoint(clientX, clientY);
    const note = element?.getAttribute('data-note');

    if (!note) return;

    // start new oscillator only on initial touch/click
    if (nativeEvent.type === 'pointerdown') {
      currentNotes.set(pointerId, note);
      keyboard[note].play();
    } else {
      // on pointer move change ringing ocsillator frequency
      const currentFrequency = keyboard[note].getFrequency();
      const heldNote = currentNotes.get(pointerId);
      keyboard[heldNote || note].changeFrequency(currentFrequency);
    }
  };

  const handleNoteStop = (pointerId: number) => {
    const note = currentNotes.get(pointerId);
    if (!note) return;

    keyboard[note].stop();
    currentNotes.delete(pointerId);
  };

  return (
    <div className="keyboard-wrapper">
      <div
        className="keyboard"
        onPointerDown={handleNotesChange}
        onPointerEnter={(e) => {
          if (!currentNotes.has(e.pointerId)) return;
          handleNotesChange(e);
        }}
        onPointerMove={(e) => {
          if (!currentNotes.has(e.pointerId)) return;
          handleNotesChange(e);
        }}
        onPointerUp={(e) => handleNoteStop(e.pointerId)}
        onPointerLeave={(e) => handleNoteStop(e.pointerId)}
        onPointerCancel={(e) => handleNoteStop(e.pointerId)}
      >
        {getKeyboardByOctaves(keyboard).map((octave, octaveIdx) =>
          octave.map((key, idx) => {
            const note = Object.keys(key)[0];
            const { isBlack, leftOffset, width } = getKeyProps(
              note,
              idx,
              octaveIdx,
            );
            return (
              <div
                key={note}
                data-note={note}
                className={isBlack ? 'note black' : 'note white'}
                style={{
                  left: leftOffset,
                  width,
                }}
              />
            );
          }),
        )}
      </div>
    </div>
  );
};

export default Keyboard;
