import './styles.css';

interface IControlsBlockProps {
  elements: JSX.Element[];
  label?: string;
}

const ControlsBlock = ({ elements, label }: IControlsBlockProps) => {
  return (
    <div className="controls-container">
      <div className="controls-thumb">{elements}</div>
      {!!label && <span className="controls-label">{label}</span>}
    </div>
  );
};

export default ControlsBlock;
