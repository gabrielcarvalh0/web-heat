import { useContext } from "react";
import styles from "./App.module.scss";
import { LoginBox } from "./components/LoginBox";
import { MessageList } from "./components/MessageList";
import { AuthContext } from "./context/auth";
import { SendMessageForm } from "./components/SendMessageForm/index";
import { Header } from "./components/Header";
export function App() {
  const { user } = useContext(AuthContext);
  return (
    <main
      className={`${styles.contentWrapper} ${
        !!user ? styles.contentSigned : ""
      }`}
    >
      <Header />
      <MessageList />
      {!!user ? <SendMessageForm /> : <LoginBox />}
    </main>
  );
}
