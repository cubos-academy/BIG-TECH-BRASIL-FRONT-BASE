import styles from "./styles.module.scss";
import PublicParticipantCard from "../../components/ParticipantCard/Public";
import { useState } from "react";
import { GameType } from "../../types/GameType";
import { gameData, participants } from "../../fakeData";
import { ParticipantType } from "../../types/ParticipantType";
import CheckIcon from "../../assets/check-icon.svg";

function Main() {
  const [game, setGame] = useState<GameType>({ ...gameData });
  const [allParticipants, setAllParticipants] = useState<ParticipantType[]>([
    ...participants,
  ]);

  const [selectedParticipant, setSelectedParticipant] =
    useState<ParticipantType | null>();

  const [votedParticipant, setVotedParticipant] =
    useState<ParticipantType | null>();

  function handleSelect(id: string) {
    if (!game) {
      return;
    }

    if (votedParticipant || !game.isActive) {
      return;
    }

    const localParticipants = [...allParticipants];

    localParticipants.forEach((participant) => {
      if (participant.id === id) {
        if (participant.id === selectedParticipant?.id) {
          setSelectedParticipant(null);
          return;
        }

        setSelectedParticipant(participant);
      }
    });
  }

  function handleVote() {
    setVotedParticipant(selectedParticipant);
  }

  function handleClearVote() {
    setSelectedParticipant(null);
    setVotedParticipant(null);
  }

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <span>BIG TECH BRASIL</span>
        <h1>
          {game.isActive
            ? "Quem você gostaria de eliminar?"
            : "Votação encerrada!"}
        </h1>

        <div className={styles.container__participants}>
          {game.gameParticipants.map((gameParticipant) => (
            <div key={gameParticipant.participant.id}>
              {votedParticipant?.id === gameParticipant.participant.id && (
                <span>
                  <img src={CheckIcon} alt="check" />
                  Você votou em
                </span>
              )}
              <PublicParticipantCard
                gameParticipant={gameParticipant}
                handleSelect={handleSelect}
                selected={selectedParticipant}
                voted={votedParticipant}
              />
            </div>
          ))}
        </div>

        {game.isActive && (
          <button
            className={`${
              selectedParticipant
                ? "btn-rounded--pink"
                : "btn-rounded--disabled"
            }`}
            onClick={() =>
              votedParticipant ? handleClearVote() : handleVote()
            }
          >
            {votedParticipant ? "Votar novamente" : "Confirmar voto"}
          </button>
        )}

        <span>Feito com ♥ pela Cubos Academy</span>
      </div>
    </main>
  );
}
export default Main;
