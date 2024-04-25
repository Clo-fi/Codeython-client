import { createPortal } from "react-dom";
import styles from "./ProblemListModal.module.scss";
import Button from "../../../../components/common/Button";
import { useState } from "react";
import ProblemBlock from "./ProblemBlock";
import useFetching from "../../../../hooks/useFetching";
import {
  getProblemList,
  patchSelectedProblem,
} from "../../../../api/problem/problem";
import { useSearchParams } from "react-router-dom";

interface Props {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal = ({ setModal }: Props) => {
  const [selected, setSelected] = useState<null | number>(null);
  const { data } = useFetching(getProblemList);
  const [searchParams] = useSearchParams();

  const changeSelectedProblem = async () => {
    if (!selected) setModal(false);

    try {
      await patchSelectedProblem(
        Number(searchParams.get("roomId")),
        Number(selected)
      );
      setModal(false);
    } catch (err) {
      console.log("변경 실패");
    }
  };
  return (
    <>
      <div className={styles.backdrop} />
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.list_group}>
            <div className={styles.info}>
              <div className={styles.grade}>난이도</div>
              <div className={styles.title}>제목</div>
            </div>
            <div className={styles.list}>
              {data?.map((p) => (
                <ProblemBlock
                  {...p}
                  key={p.problemId}
                  onClick={(id) => setSelected(id)}
                  isSelected={p.problemId === selected}
                />
              ))}
            </div>
          </div>
          <Button value="선택하기" onClick={changeSelectedProblem} />
        </div>
      </div>
    </>
  );
};

const ProblemListModal = ({ setModal }: Props) => {
  return (
    <>
      {createPortal(
        <Modal setModal={setModal} />,
        document.getElementById("modal-root") as HTMLElement
      )}
    </>
  );
};

export default ProblemListModal;
