import { useState, useEffect } from 'react';
import { getTurnAngle, percentageToValue, valueToPercentage } from './helpers';
import './styles.css';

interface IKnobProps {
  label: string;
  initialValue: number;
  handleChange: (value: number) => void;
  range: {
    min: number;
    max: number;
  };
}

const initialRotate = -135;

const createTicks = () => {
  const ticks = [];
  let tickAngle = initialRotate;
  for (let i = 0; i < 10; i += 1) {
    const element = (
      <div
        key={i}
        className="tick"
        style={{ transform: `rotate(${tickAngle}deg)` }}
      />
    );
    ticks.push(element);
    tickAngle += 30;
  }

  return ticks;
};

const Knob = ({
  label,
  initialValue,
  handleChange,
  range: { min, max },
}: IKnobProps) => {
  const [mousePressed, setMousePressed] = useState(false);
  const [rotationDegree, setRotationDegree] = useState(
    valueToPercentage(initialValue, min, max) * 100 * (270 / 100),
  );

  const handleKnobTurn = (
    knobCenterX: number,
    knobCenterY: number,
    cursorX: number,
    cursorY: number,
  ) => {
    const angle = getTurnAngle({
      knobCenterX,
      knobCenterY,
      cursorX,
      cursorY,
      rotationOffset: initialRotate,
    });

    if (angle >= 0 && angle <= 270) {
      const percentage = Math.round(angle / (270 / 100));
      const value = percentageToValue(percentage / 100, min, max);
      handleChange(value);
      setRotationDegree(angle);
    }
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
    <div className="container" id="knob-container">
      <p className="label">{label}</p>
      <div
        className="knob-thumb"
        onMouseMove={(e) => {
          if (mousePressed) {
            const { left, top, width, height } =
              e.currentTarget.getBoundingClientRect();
            handleKnobTurn(
              left + width / 2,
              top + height / 2,
              e.pageX,
              e.pageY,
            );
          }
        }}
        onTouchMove={(e) => {
          if (mousePressed) {
            const { left, top, width, height } =
              e.currentTarget.getBoundingClientRect();
            handleKnobTurn(
              left + width / 2,
              top + height / 2,
              e.touches[0].clientX,
              e.touches[0].clientY,
            );
          }
        }}
      >
        <div
          className="knob"
          style={{
            transform: `rotate(${rotationDegree + initialRotate}deg)`,
          }}
        />
        {createTicks()}
      </div>
    </div>
  );
};

export default Knob;
