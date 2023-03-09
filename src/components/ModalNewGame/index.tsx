import { useEffect, useState } from "react";
import { participants } from "../../fakeData";
import api from "../../services/api";
import { ParticipantType } from "../../types/ParticipantType";
import styles from "./styles.module.scss";

interface IProps {
  open: boolean;
  handleClose: () => void;
}

function ModalNewGame({ open, handleClose }: IProps) {
  const [allParticipants, setAllParticipants] = useState<ParticipantType[]>([]);

  function handleCheckParticipant(id: string) {
    const localParticipants = [...allParticipants];

    localParticipants.forEach((participant) => {
      if (participant.id === id) {
        participant.checked = !participant.checked;
      }
    });

    setAllParticipants(localParticipants);
  }

  async function handleCreateNewGame() {
    try {
      const selectedParticipantsId = [];

      for (const participant of allParticipants) {
        if (participant.checked) {
          selectedParticipantsId.push(participant.id);
        }
      }

      if (!selectedParticipantsId.length) {
        console.log("Selecione um participante");
        return;
      }
      const response = await api.post("/games", {
        participants: selectedParticipantsId,
      });

      if (response.status === 201) {
        handleClose();
      }

      console.log("Game criado...");
      console.log(selectedParticipantsId);
    } catch (error) {
      console.log(error);
    }
  }

  async function loadParticipants() {
    try {
      const response = await api.get("/participants?active=true");
      const data = response.data as ParticipantType[];

      data.forEach((participant) => (participant.checked = false));

      setAllParticipants(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (open) {
      loadParticipants();
    }
  }, [open]);

  return (
    <>
      {open && (
        <div className={styles.backdrop}>
          <div className={styles.modal}>
            <div className={styles["modal--header"]}>
              <h2>Nova votação</h2>
              <span>{allParticipants.length} Disponíveis</span>
            </div>

            <div className={styles["modal--participants"]}>
              {allParticipants.map((participant) => (
                <div key={participant.id}>
                  <label className="container-checkbox">
                    <input
                      type="checkbox"
                      id={participant.id}
                      value={participant.name}
                      checked={participant.checked}
                      onChange={() => handleCheckParticipant(participant.id)}
                    />
                    <span className="checkmark" />
                  </label>
                  <img src={participant.avatar} alt="avatar" />
                  <span>{participant.name}</span>
                </div>
              ))}
            </div>

            <hr />

            <div className={styles["modal--buttons"]}>
              <button className="btn-outline--gray" onClick={handleClose}>
                Cancelar
              </button>
              <button
                className="btn-rounded--pink"
                onClick={handleCreateNewGame}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ModalNewGame;
