import Card from "../Card";
import "./style.css";
import Button from "../Button";
import DATA, { DATA_TYPE } from "../../constants/DATA";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
function shuffle(array) {
  const result = [],
    itemsLeft = array.concat([]);

  while (itemsLeft.length) {
    const randomIndex = Math.floor(Math.random() * itemsLeft.length);
    const [randomItem] = itemsLeft.splice(randomIndex, 1); // take out a random item from itemsLeft
    result.push(randomItem); // ...and add it to the result
  }

  return result;
}
export default function PlayScreen({ handleSwitchScreen, dataType }) {
  const data = useMemo(() => {
    return shuffle(DATA[dataType]);
  }, [dataType]);
  const timeoutRef = useRef(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const { text, textColor, backgroundColor, answer } = data[currentQuestion];
  const [userChoose, setUserChoose] = useState(null);
  const options = useMemo(() => {
    const _options = [answer];
    for (let i = 1; i < 4; i++) {
      let randomAnswer = null;
      while (
        !randomAnswer ||
        randomAnswer === answer ||
        _options.includes(randomAnswer)
      ) {
        randomAnswer = data[Math.floor(Math.random() * data.length)].answer;
      }
      _options.push(randomAnswer);
    }
    return shuffle( _options);
  }, [currentQuestion, answer]);
  const handleCheckResult = useCallback(
    (inputAnswer) => {
      setUserChoose(inputAnswer);
      if (currentQuestion < data.length - 1)
        timeoutRef.current = setTimeout(() => {
          setUserChoose(null);
          setCurrentQuestion(currentQuestion + 1);
        }, 1000);
    },
    [data, currentQuestion]
  );
  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);
  return (
    <div className="play-screen">
      <h1>
        {dataType === DATA_TYPE.CONSONANTS ? "24 Consonants" : "15 Vowels"} - Q-
        {currentQuestion + 1}
      </h1>
      <div className="quit-button">
        <Button onClick={() => handleSwitchScreen()}>Quit</Button>
      </div>
      <div className="play-screen-container">
        <div className="play-screen__question">
          <Card
            text={text}
            textColor={textColor}
            backgroundColor={backgroundColor}
          />
        </div>
        <div className="play-screen__answer" key={currentQuestion}>
          {options.map((text) => (
            <div className="play-screen__answer-item" key={text}>
              <Button
                disabled={!!userChoose}
                onClick={() => {
                  handleCheckResult(text);
                }}
                className={`${
                  !!userChoose
                    ? text === answer
                      ? "btn--sucess"
                      : text === userChoose && userChoose !== answer
                      ? "btn--error"
                      : ""
                    : ""
                }`}
              >
                {text}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
