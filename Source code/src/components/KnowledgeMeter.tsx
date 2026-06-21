import { forwardRef, useImperativeHandle, useState } from "react";
import { TOTAL_KNOWLEDGE_SCORE } from "../constants";
import { BsSpeedometer2 } from "react-icons/bs";
import { useGameStateContext } from "../utils/useGameState";

export type KnowledgeMeterRef = {
  expandTemporarily: () => void;
};

const KnowledgeMeter = forwardRef<KnowledgeMeterRef, { progress: number }>(({ progress }, ref) => {
  const { setClickCounter } = useGameStateContext();
  const [isExpanded, setIsExpanded] = useState(false);

  const expandTemporarily = () => {
    setIsExpanded(true);
    setTimeout(() => {
      setIsExpanded(false);
    }, 3000);
  };

  useImperativeHandle(ref, () => ({
    expandTemporarily: () => expandTemporarily(),
  }));

  return (
    <div
      className="horizontal-progress-bar"
      data-expanded={isExpanded}
      onClick={() => {
        expandTemporarily();
        setClickCounter("knowledge_meter");
      }}
    >
      <button className="progress-button" data-expanded={isExpanded}>
        <BsSpeedometer2 size={30} />
      </button>
      <div
        className="progress-bar"
        data-expanded={isExpanded}
        style={{ width: `${(progress * 100) / TOTAL_KNOWLEDGE_SCORE}%` }}
      ></div>
      <div
        className="progress-label"
        data-expanded={isExpanded}
      >{`Knowledge Score: ${progress} / ${TOTAL_KNOWLEDGE_SCORE}`}</div>
    </div>
  );
});

export default KnowledgeMeter;
