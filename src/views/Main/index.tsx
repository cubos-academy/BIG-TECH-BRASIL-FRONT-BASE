import styles from "./styles.module.scss";
import PublicParticipantCard from "../../components/ParticipantCard/Public";
import { useEffect, useState } from "react";
import { GameType } from "../../types/GameType";
import { participants } from "../../fakeData";
import { ParticipantType } from "../../types/ParticipantType";
import CheckIcon from "../../assets/check-icon.svg";
import api from "../../services/api";

function Main() {
  const [game, setGame] = useState<GameType>();
  const [allParticipants, setAllParticipants] = useState<ParticipantType[]>([]);

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

  async function handleVote() {
    try {
      if (!selectedParticipant) {
        return;
      }

      await api.post("/votes", {
        participantId: selectedParticipant.id,
        gameId: game?.id,
      });

      setVotedParticipant(selectedParticipant);
    } catch (error) {
      console.log(error);
    }
  }

  function handleClearVote() {
    setSelectedParticipant(null);
    setVotedParticipant(null);
  }

  useEffect(() => {
    async function loadGame() {
      try {
        const response = await api.get("/games");
        const data: GameType = response.data[0];

        const gameParticipants = data.gameParticipants.map(
          (gameParticipant) => gameParticipant.participant
        );

        setGame(data);
        setAllParticipants(gameParticipants);
      } catch (error) {
        console.log(error);
      }
    }

    loadGame();
  }, []);

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <span>BIG TECH BRASIL</span>
        <h1>
          {game && game.isActive
            ? "Quem você gostaria de eliminar?"
            : "Votação encerrada!"}
        </h1>

        <div className={styles.container__participants}>
          {game &&
            game.gameParticipants.map((gameParticipant) => (
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

        {game && game.isActive && (
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
