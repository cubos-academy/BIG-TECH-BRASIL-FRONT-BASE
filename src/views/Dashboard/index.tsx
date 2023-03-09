import Sidebar from "../../components/Sidebar";
import styles from "./styles.module.scss";
import GrayLogo from "../../assets/gray-btb-logo.svg";
import DashboardParticipantCard from "../../components/ParticipantCard/Dashboard";
import { useEffect, useState } from "react";
import { GameType } from "../../types/GameType";
import { gameData } from "../../fakeData";
import ModalNewGame from "../../components/ModalNewGame";
import api from "../../services/api";

function Dashboard() {
  const [game, setGame] = useState<GameType>();
  const [open, setOpen] = useState(false);

  function handleCopyUrl() {
    navigator.clipboard.writeText("http://localhost:3000");
  }

  function handleClose() {
    setOpen(false);
    loadGame();
  }

  async function handleFinishGame() {
    try {
      await api.patch(`/games/${game?.id}`);
      loadGame();
    } catch (error) {
      console.log(error);
    }
  }

  async function loadGame() {
    try {
      const response = await api.get("/games");
      const data: GameType = response.data[0];

      setGame(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    loadGame();
  }, []);

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.content}>
        {!game ? (
          <div className={styles["content--new-vote"]}>
            <img src={GrayLogo} alt="logo" />
            <strong>Nenhuma votação cadastrada</strong>
            <button className="btn-rounded--pink" onClick={() => setOpen(true)}>
              Criar nova votação
            </button>
          </div>
        ) : (
          <div className={styles["content--participants-vote"]}>
            <div>
              {game.gameParticipants.map((gameParticipant) => (
                <DashboardParticipantCard
                  key={gameParticipant.participant.id}
                  gameParticipant={gameParticipant}
                  selected={gameParticipant.participant.eliminated}
                />
              ))}
            </div>
            <div>
              {game.isActive ? (
                <button
                  className="btn-outline--gray"
                  onClick={handleFinishGame}
                >
                  Encerrar votação
                </button>
              ) : (
                <button
                  className="btn-rounded--pink"
                  onClick={() => setOpen(true)}
                >
                  Criar nova votação
                </button>
              )}

              <button className="btn-outline--disabled" onClick={handleCopyUrl}>
                http://localhost:3000
              </button>
            </div>
          </div>
        )}
      </div>
      <ModalNewGame open={open} handleClose={handleClose} />
    </div>
  );
}
export default Dashboard;
