import Level1Icon from "../../assets/icons/level1.svg?react";
import Level2Icon from "../../assets/icons/level2.svg?react";
import Level3Icon from "../../assets/icons/level3.svg?react";
import Level4Icon from "../../assets/icons/level4.svg?react";
import Level5Icon from "../../assets/icons/level5.svg?react";
import Level6Icon from "../../assets/icons/level6.svg?react";
import Level7Icon from "../../assets/icons/level7.svg?react";
import Level8Icon from "../../assets/icons/level8.svg?react";
import Level9Icon from "../../assets/icons/level9.svg?react";
import Level10Icon from "../../assets/icons/level10.svg?react";

interface IconMapper {
  [key: number]: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
}

const iconMapper: IconMapper = {
  1: Level1Icon,
  2: Level2Icon,
  3: Level3Icon,
  4: Level4Icon,
  5: Level5Icon,
  6: Level6Icon,
  7: Level7Icon,
  8: Level8Icon,
  9: Level9Icon,
  10: Level10Icon,
};

interface Props {
  level: number;
  className?: string;
}

const LevelIcon = ({ level, className }: Props) => {
  const IconComponent = iconMapper[level];
  if (!IconComponent) {
    const DefaultComponent = iconMapper[10];
    return <DefaultComponent />;
  }

  return <IconComponent className={className} />;
};

export default LevelIcon;
