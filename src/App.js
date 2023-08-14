import { useState, createContext } from "react";

import { Container } from "~/components/Container";
import { Header } from "./components/Header";

import classNames from "classnames/bind";
import styles from './components/GlobalStyle/GlobalStyle.module.scss';

const cx = classNames.bind(styles);

export const ThemeContext = createContext()

function App() {

  const [theme, setTheme] = useState('light')

  return (
    <ThemeContext.Provider value={[theme, setTheme]}>
      <div className={cx('App', theme)}>
        <Header />
        <Container />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
