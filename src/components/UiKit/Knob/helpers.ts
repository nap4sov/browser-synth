export const valueToPercentage = (value: number, min: number, max: number) =>
  (value - min) / (max - min);

export const percentageToValue = (
  percentage: number,
  min: number,
  max: number,
) => (max - min) * percentage + min;

export const getTurnAngle = ({
  knobCenterX,
  knobCenterY,
  cursorX,
  cursorY,
  rotationOffset,
}: {
  knobCenterX: number;
  knobCenterY: number;
  cursorX: number;
  cursorY: number;
  rotationOffset: number;
}) => {
  const deltaX = knobCenterX - cursorX;
  const deltaY = knobCenterY - cursorY;
  const rad = Math.atan2(deltaX, deltaY);
  const radInDeg = (rad * 180) / Math.PI;
  const angle = -(radInDeg + rotationOffset);
  return angle;
};
