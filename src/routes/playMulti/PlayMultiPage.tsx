import { useParams } from 'react-router-dom';
import PlayHeader from './components/PlayHeader';
import PlayMultiForm from './components/PlayMultiForm';

import useProblemFetching from '../../hooks/useProblemFetching';
import { useWebSocket } from '../../libs/stomp/useWebSocket';
import useUserStore from '../../store/UserStore';
import { UserInfo } from '../../types/user';
import { useEffect, useState } from 'react';
import { MESSAGE_TYPE, decode } from '../../libs/stomp/decoder';

export interface ChatInfo {
  from: string;
  message: string;
}[];

const PlayMultiPage = () => {
  const { problemId } = useParams<{ problemId: string }>();
  const { roomId } = useParams<{ roomId: string }>();
  const { problemInfo, isLoading } = useProblemFetching(problemId!);

  const { nickname } = useUserStore();
  const [users, setUsers] = useState<UserInfo[]>([]);
  const [chatList, setChatList] = useState<ChatInfo[]>([]);

  const { setUserInfo } = useUserStore();
  const socketClient = useWebSocket();

  useEffect(() => {
    setUserInfo();
  }, [setUserInfo]);

  useEffect(() => {
    if (!socketClient) return;
    socketClient.onConnect = () => {
      socketClient.subscribe(`/sub/room/${roomId}`, (message) => {
        const { type, data } = decode(message);

        if (type === MESSAGE_TYPE.USER) {
          setUsers(data);
          console.log(data);
        } else if (type === MESSAGE_TYPE.CHAT) {
          setChatList((prev) => [...prev, data]);
          console.log(data);
        }
      })

      socketClient.publish({
        destination: `/pub/room/${roomId}/join`,
      });
    }
    return () => {
      if (socketClient) {
        socketClient.publish({
          destination: `/pub/room/${roomId}/leave`,
          headers: { nickname }
        });
        console.log('디스커넥트');
      }
    }

  }, [socketClient])

  console.log(users);
  return (
    <>
      <PlayHeader problemInfo={problemInfo!} isLoading={isLoading} />
      <PlayMultiForm
        users={users} chatList={chatList}
        problemInfo={problemInfo!}
        isLoading={isLoading}
        problemId={problemId!}
        roomId={roomId!} />
    </>
  );
}

export default PlayMultiPage;
