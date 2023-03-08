import styles from "../styles.module.scss";
import { GameParticipantType } from "../../../types/GameParticipantType";
import { ParticipantType } from "../../../types/ParticipantType";

interface IProps {
  gameParticipant: GameParticipantType;
  handleSelect: (id: string) => void;
  selected?: ParticipantType | null;
  voted?: ParticipantType | null;
}

function PublicParticipantCard({
  gameParticipant,
  handleSelect,
  selected,
  voted,
}: IProps) {
  const { participant } = gameParticipant;
  return (
    <div
      className={
        selected?.id === participant.id || participant.eliminated
          ? `${styles.container} ${styles["container--selected"]}`
          : styles.container
      }
      style={{
        filter: `${
          voted && voted.id !== participant.id ? "grayscale(1.0)" : ""
        }`,
      }}
      onClick={() => handleSelect(participant.id)}
    >
      <div>
        <h1>{participant.name}</h1>
        {participant.eliminated && (
          <h1>Eliminado (a) {gameParticipant.percent.toFixed(1)} %</h1>
        )}
      </div>
      <img src={participant.avatar} alt="participant" />
    </div>
  );
}

export default PublicParticipantCard;
