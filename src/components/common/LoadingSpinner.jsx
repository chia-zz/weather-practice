import { RotatingLines } from 'react-loader-spinner';

const LoadingSpinner = ({
  height = '20',
  width = '20',
  color = '#fff5ec',
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

export const PageLoading = ({
  height = '80',
  width = '80',
  color = '#1F6B65',
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
