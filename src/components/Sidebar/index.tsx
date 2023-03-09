import styles from "./styles.module.scss";
import Logo from "../../assets/btb-logo.svg";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <h1>
        BIG TECH BRASIL <img src={Logo} alt="logo" />
      </h1>

      <button className="btn--gray" onClick={() => navigate("/")}>
        Logout
      </button>
    </div>
  );
}

export default Sidebar;
