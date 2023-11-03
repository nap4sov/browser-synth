export const valueToPercentage = (value: number, min: number, max: number) =>
  (value - min) / (max - min);

export const percentageToValue = (
  percentage: number,
  min: number,
  max: number,
) => (max - min) * percentage + min;
