import "./app.css";
import MainScreen from "./MainScreen";
import PlayScreen from "./PlayScreen";
import { useCallback, useState } from "react";
import SCREENS from "../constants/SCREENS";
import { DATA_TYPE } from "../constants/DATA";
export default function App() {
  const [currentScreen, setCurrentScreen] = useState(SCREENS.MAIN_SCREEN);
  const [dataType, setDataType] = useState(DATA_TYPE.VOWELS);
  const switchScreen = useCallback(
    (screen = SCREENS.MAIN_SCREEN, type = DATA_TYPE.VOWELS) => {
      setCurrentScreen(screen);
      setDataType(screen === SCREENS.PLAY_SCREEN ? type : null);
    },
    []
  );
  return currentScreen === SCREENS.MAIN_SCREEN ? (
    <MainScreen handleSwitchScreen={switchScreen} />
  ) : (
    <PlayScreen handleSwitchScreen={switchScreen} dataType={dataType} />
  );
}
