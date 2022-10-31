import React, { useContext } from "react";
import { VscSignOut } from "react-icons/vsc";

import logoImg from "../../assets/logo.svg";
import { AuthContext } from "../../context/auth";
import styles from "./styles.module.scss";

export function Header() {
    const {signOut } = useContext(AuthContext);

  return (
    <div className={styles.conteinerHeader}>
      <img src={logoImg} alt="doWhile 2021" />
<div className={styles.conteinerNavInfo}>
<button  onClick={signOut} className={styles.signOutButton}>
          Sair
        </button>
      <div className={styles.divProfile}>
      
        <img
          src={"https://github.com/gabrielcarvalh0.png"}
          alt="doWhile 2021"
        />
      </div>
</div>
  
    </div>
  );
}
