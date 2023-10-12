import "./style.css";
import Button from "../Button";
import SCREENS from "../../constants/SCREENS";
import { DATA_TYPE } from "../../constants/DATA";
export default function MainScreen({ handleSwitchScreen }) {
  return (
    <div className="main-screen">
      <h1 className="main-screen__title">Quizz</h1>
      <div className="main-screen__controls-group">
        <Button
          onClick={() =>
            handleSwitchScreen(SCREENS.PLAY_SCREEN, DATA_TYPE.VOWELS)
          }
        >
          15 Vowels
        </Button>
        <Button
          onClick={() =>
            handleSwitchScreen(SCREENS.PLAY_SCREEN, DATA_TYPE.CONSONANTS)
          }
        >
          24 Consonants
        </Button>
      </div>
    </div>
  );
}
