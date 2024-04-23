import { Navigate } from "react-router-dom";
import { UserInfo } from "../../types/user";

interface HOCProps {
  users: UserInfo[];
  roomId: string | undefined;
}

export const withEnterRoom = <T extends HOCProps>(
  Component: React.ComponentType<T>
) => {
  return function WithEnterRoom(props: T) {
    const { roomId } = props;

    if (roomId) {
      return <Component {...props} />;
    } else {
      return <Navigate to="/" />; //TODO 리스트로 이동
    }
  };
};
