import Level1Icon from "../../assets/icons/level1.svg?react";
import Level2Icon from "../../assets/icons/level2.svg?react";
import Level3Icon from "../../assets/icons/level3.svg?react";
import Level4Icon from "../../assets/icons/level4.svg?react";
import Level5Icon from "../../assets/icons/level5.svg?react";
interface Props {
  level: number;
  className?: string;
}

const LevelIcon = ({ level, className }: Props) => {
  if (level === 1) {
    return <Level1Icon className={className} />;
  }
  if (level === 2) {
    return <Level2Icon className={className} />;
  }
  if (level === 3) {
    return <Level3Icon className={className} />;
  }
  if (level === 4) {
    return <Level4Icon className={className} />;
  }
  if (level === 5) {
    return <Level5Icon className={className} />;
  }

  return null;
};

export default LevelIcon;
