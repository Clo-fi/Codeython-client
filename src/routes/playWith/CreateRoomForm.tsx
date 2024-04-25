import React, { useState } from "react";
import styles from "./CreateRoomForm.module.scss";
import Button from "../../components/common/Button";
import { create } from "zustand";
import instance from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { CustomAlert } from "../../libs/sweetAlert/alert";

interface CreateFactor {
  roomName: string;
  problemId: number | null;
  limitMemberCnt: number;
  isSecret: boolean;
  password: string | null;
  isSoloPlay: boolean;
  setRoomName: (name: string) => void;
  setLimitMemberCnt: (cnt: number) => void;
  setProblemId: (id: number | null) => void;
  toggleIsSecret: () => void;
  setPassword: (password: string) => void;
}

interface Problem {
  problemId: number;
  title: string;
  difficulty: number;
  isPlayed: boolean;
  accuracy: number;
}

interface CreateRoomFormProps {
  problemList: Problem[];
  selectedProblem: Problem | null;
  setSelectedProblem: (problem: Problem | null) => void;
}

const useCreateFactorStore = create<CreateFactor>((set) => ({
  // 초기값을 빈 문자열로 설정
  roomName: "",
  problemId: null,
  limitMemberCnt: 4,
  isSecret: false,
  password: "",
  isSoloPlay: true,
  setProblemId: (id) => set({ problemId: id }),
  setRoomName: (name) => set({ roomName: name }),
  setLimitMemberCnt: (cnt) => set({ limitMemberCnt: cnt }),
  toggleIsSecret: () =>
    set((state) => ({
      isSecret: !state.isSecret,
      password: state.isSecret ? "" : state.password, // 비밀방을 비활성화할 때 빈 문자열로 설정
    })),
  setPassword: (password) => set({ password }),
}));

const CreateRoomForm: React.FC<CreateRoomFormProps> = ({
  problemList,
  selectedProblem,
  setSelectedProblem,
}) => {
  const [selectedLimit, setSelectedLimit] = useState(4);
  const [showProblemList, setShowProblemList] = useState(false);
  const {
    roomName,
    problemId,
    limitMemberCnt,
    isSecret,
    password,
    isSoloPlay,
    setRoomName,
    toggleIsSecret,
    setPassword,
    setLimitMemberCnt,
    setProblemId,
  } = useCreateFactorStore();
  const navigate = useNavigate();

  const handleLimitCnt = (cnt: number) => () => {
    setLimitMemberCnt(cnt);
    setSelectedLimit(cnt);
  };

  const getButtonClass = (cnt: number) => {
    return cnt === selectedLimit
      ? `${styles.limit_btn} ${styles.selected}`
      : styles.limit_btn;
  };

  const handleSelectProblem = (problem: Problem) => {
    setSelectedProblem(problem);
    useCreateFactorStore.setState({ problemId: problem.problemId });
    setShowProblemList(false); // 선택 후 목록을 숨김
  };

  const handleCreate = async () => {
    try {
      const postData = {
        roomName,
        problemId,
        limitMemberCnt,
        isSecret,
        password: isSecret ? password : null, // isSecret이 false일 경우, password를 null로 설정
        isSoloPlay,
      };

      const response = await instance.post("/rooms", postData);
      console.log("방 생성 성공:", response.data);

      setPassword("");
      setRoomName("");
      setProblemId(null);
      const { roomId } = response.data;
      await enterRoom(roomId);
    } catch (error) {
      CustomAlert.fire({
        icon: "error",
        title: "방 생성 실패!!",
        text: "방 이름과 문제를 확인해주세요!!",
      });
      console.error("방 생성 오류:", error);
    }
  };

  const enterRoom = async (roomId: number) => {
    const payload = { password: isSecret ? password : null };
    try {
      const enterResponse = await instance.post(`/rooms/${roomId}`, payload);
      const {
        problemId,
        problemTitle,
        limitTime,
        difficulty,
        roomName,
        inviteCode,
        isSoloPlay,
        limitMemberCnt,
      } = enterResponse.data;

      // 쿼리 파라미터로 인코딩하여 URL 생성
      const queryParams = new URLSearchParams({
        problemId: problemId.toString(),
        problemTitle,
        limitTime: limitTime.toString(), // 숫자인 경우 문자열로 변환
        difficulty: difficulty.toString(),
        roomName,
        inviteCode,
        isSoloplay: isSoloPlay.toString(), // 불리언인 경우 문자열로 변환
        roomId: roomId.toString(), // 숫자인 경우 문자열로 변환
        limitMemberCnt,
      }).toString();

      // navigate 함수를 사용하여 쿼리 파라미터와 함께 페이지 이동
      navigate(`/waiting/${roomId}?${queryParams}`);
    } catch (error) {
      console.log(error);

      CustomAlert.fire({
        icon: "error",
        title: "에러 발생!",
        text: "방 입장에 실패했습니다. 다시 시도해주세요",
      });
    }
  };

  return (
    <div className={styles.create_contaier}>
      <div className={styles.roomname_section}>
        <input
          type="text"
          className={styles.roomname}
          placeholder="경기장 이름을 적어주세요."
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
        />
      </div>
      <div className={styles.choose_problem_section}>
        <div className={styles.list_section}>
          <div
            className={styles.selected_problem}
            onClick={() => setShowProblemList(!showProblemList)}
          >
            {selectedProblem ? (
              <>
                <span>
                  {selectedProblem.title} - 난이도: {selectedProblem.difficulty}
                </span>
              </>
            ) : (
              <span>문제를 선택해 주세요.</span>
            )}
          </div>
          {showProblemList && (
            <div className={styles.toggle_problem}>
              {problemList.map((problem) => (
                <div
                  key={problem.problemId}
                  onClick={() => handleSelectProblem(problem)}
                  className={styles.problem_item}
                >
                  {problem.title} - 난이도: {problem.difficulty}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className={styles.limit_section}>
        <div>선수 입장 제한 인원 : {limitMemberCnt}명</div>
        <button onClick={handleLimitCnt(2)} className={getButtonClass(2)}>
          2
        </button>
        <button onClick={handleLimitCnt(4)} className={getButtonClass(4)}>
          4
        </button>
        <button onClick={handleLimitCnt(6)} className={getButtonClass(6)}>
          6
        </button>
      </div>
      <div className={styles.secret_create_section}>
        <div className={styles.secret_section}>
          <div className={styles.secret_checkbox}>
            비밀방 여부 :
            <input
              type="checkbox"
              checked={isSecret}
              onChange={toggleIsSecret}
              className={styles.checkbox}
            />
          </div>
          <input
            className={styles.password}
            type="text"
            placeholder="비밀번호 입력"
            value={password!}
            onChange={(e) => setPassword(e.target.value)}
            disabled={!isSecret} // isSecret이 false일 경우 비활성화
          />
        </div>
        <Button
          className={styles.create_btn}
          onClick={handleCreate}
          value="경기장 생성하기"
        />
      </div>
    </div>
  );
};

export default CreateRoomForm;
