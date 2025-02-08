import styles from '../styles/Card.module.css';
import { useEffect } from "react";

function Card( { value , isHighlighted  } ) {

    function speak(text) {
        if ("speechSynthesis" in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = "fr-FR"; 
            window.speechSynthesis.speak(utterance);
        } else {
            console.log("Speech synthesis not supported in this browser.");
        }
    }

    useEffect(() => {
        if (isHighlighted) {
            speak(value);
        }
    }, [isHighlighted, value]);
                   

  return (
    <div>
      <input 
        type="text"
        value={value}
        readOnly 
        className={styles.card}
        style={{ color: isHighlighted ? "red" : "black" }}
      />
    </div>
  );
}

export default Card;
