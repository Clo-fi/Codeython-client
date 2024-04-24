import { useNavigate, useParams } from 'react-router-dom';
import PlayHeader from './components/PlayHeader';
import PlayMultiForm from './components/PlayMultiForm';

import useProblemFetching from '../../hooks/useProblemFetching';
import { useWebSocket } from '../../libs/stomp/useWebSocket';
import useUserStore from '../../store/UserStore';
import { UserInfo } from '../../types/user';
import { useEffect, useState } from 'react';
import { MESSAGE_TYPE, decode } from '../../libs/stomp/decoder';
import { CustomAlert } from '../../libs/sweetAlert/alert';

export interface ChatInfo {
  from: string;
  message: string;
}[];

interface EndResult {
  userNo: number;
  nickname: string;
  grade: number;
  gainExp: number;
}

const PlayMultiPage = () => {
  const { problemId } = useParams<{ problemId: string }>();
  const { roomId } = useParams<{ roomId: string }>();
  const { problemInfo, isLoading } = useProblemFetching(problemId!);

  const navigate = useNavigate();
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

    socketClient?.subscribe(`/sub/room/${roomId}`, (message) => {
      console.log('구독 부분')
      const { type, data } = decode(message);
      if (type === MESSAGE_TYPE.USER) {
        setUsers(data);
        console.log(data);
      } else if (type === MESSAGE_TYPE.CHAT) {
        setChatList((prev) => [...prev, data]);
        console.log(data);
      } else if (type === MESSAGE_TYPE.GAME_END) {
        console.log(data);
        const matchingUser = data.find((user: EndResult) => user.nickname === nickname);
        const { grade, gainExp } = matchingUser;
        CustomAlert.fire({
          icon: 'success',
          title: '게임 종료!',
          text: `${grade}등 으로 ${gainExp}경험치를 받았습니다!`,
          confirmButtonText: '홈으로 돌아가기',
          showCancelButton: true,
          cancelButtonText: '에디터 돌아가기'
        }).then((result) => {
          if (result.isConfirmed) {
            navigate('/home')
          }
        })

      }
    }
    )

    socketClient?.publish({
      destination: `/pub/room/${roomId}/join`,
    });

    return () => {
      socketClient?.publish({
        destination: `/pub/room/${roomId}/leave`,
        headers: { nickname }
      });
      console.log('디스커넥트');
    }

  }, [nickname, roomId, socketClient])

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
