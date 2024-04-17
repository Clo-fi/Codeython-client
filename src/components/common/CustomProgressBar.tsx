import { styled } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

const StyledLinearProgress = styled(LinearProgress)(({ width }: { width: string }) => ({
  height: 18,
  borderRadius: 10,
  width: width, // props로 전달된 너비 값 사용
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: '#EBEBEB'
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 10,
    backgroundColor: '#A6DFFF'
  },
}));

const CustomProgressBar = ({ exp, width }: { exp: number, width: string }) => {
  return (
    <StyledLinearProgress variant="determinate" value={exp} width={width} />
  );
}

export default CustomProgressBar;
