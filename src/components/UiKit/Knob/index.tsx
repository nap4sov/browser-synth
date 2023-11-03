import { useState } from 'react';
import { percentageToValue, valueToPercentage } from './helpers';

interface IKnobProps {
  label: string;
  initialValue: number;
  handleChange: (value: number) => void;
  range: {
    min: number;
    max: number;
  };
}

const Knob = ({
  label,
  initialValue,
  handleChange,
  range: { min, max },
}: IKnobProps) => {
  const [percentage, setPercentage] = useState(
    valueToPercentage(initialValue, min, max),
  );

  return (
    <div>
      <p>{label}</p>
      <input
        type="range"
        min={0}
        max={1}
        step={0.01}
        onChange={(e) => {
          const val = Number(e.target.value);
          setPercentage(val);
          handleChange(percentageToValue(val, min, max));
        }}
        value={percentage}
      />
    </div>
  );
};

export default Knob;
