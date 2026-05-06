import { RotatingLines } from 'react-loader-spinner';

const LoadingSpinner = ({
  height = '20',
  width = '20',
  color = '#054d87',
  visible = true,
}) => {
  return (
    <RotatingLines
      height={height}
      width={width}
      color={color}
      visible={visible}
      ariaLabel='loading'
    />
  );
};
export default LoadingSpinner;
