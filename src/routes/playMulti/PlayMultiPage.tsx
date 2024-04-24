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

  // const { nickname } = useUserStore();
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
      console.log('커넥트 부분')
      socketClient?.subscribe(`/sub/room/${roomId}`, (message) => {
        console.log('구독 부분')
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
    // ---- 
    // return () => {
    //   socketClient?.publish({
    //     destination: `/pub/room/${roomId}/leave`,
    //     headers: { nickname }
    //   });
    //   console.log('디스커넥트');
    // }

  }, [roomId, socketClient])

  // useEffect(() => {
  //   return () => {
  //     socketClient?.publish({
  //       destination: `/pub/room/${roomId}/leave`,
  //       headers: { nickname }
  //     });
  //     console.log('디스커넥트');
  //   }
  // }, [socketClient]);
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
