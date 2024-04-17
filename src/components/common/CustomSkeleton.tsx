import { Skeleton } from "@mui/material";

interface Props {
  className?: string;
  height?: string | number;
  width?: string | number;
  variant?: "text" | "rectangular" | "rounded" | "circular";
}

const CustomSkeleton = ({ ...props }: Props) => {
  return (
    <Skeleton
      sx={{ bgcolor: "#fffffff5" }}
      animation="wave"
      height={41}
      style={{ borderRadius: "20px" }}
      {...props}
    />
  );
};

export default CustomSkeleton;
