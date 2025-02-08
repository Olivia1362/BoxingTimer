import styles from "../styles/Home.module.css";
import Card from "./Card";
import { useState } from "react";
import Image from "next/image";

function Home() {
    // All hooks of state are defined here
    const [numberOfCards, setNumberOfCards] = useState(null);
    const [randomNumbers, setRandomNumbers] = useState([]);
    const [showImage, setShowImage] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(null);
    const [intervalId, setIntervalId] = useState(null);
    const [cadence, setCadence] = useState(null);

    // Update inputs with the valued entered by user ------------------------------------------------
    function handleNumberOfCards(e) {
        setNumberOfCards(e.target.value);
    }

    // const cards = [];
    // for (let i = 0; i < numberOfCards; i++) {
    //     cards.push(<Card key={i} />);
    //     console.log("CARDS:", cards);
    // }

    function handleCadence(elt) {
        setCadence(elt.target.value);
    }

    // Randomize the cards -------------------------------------------------------------------------------

    function getRandomNum(max) {
        let numList = [];

        while (numList.length < max) {
            let newNum = Math.floor(Math.random() * max) + 1;
            if (!numList.includes(newNum)) {
                numList.push(newNum);
            }
        }

        console.log(numList);
        return numList;
    }

    function handleRandomize() {
        console.log("Randomize");
        setRandomNumbers(getRandomNum(numberOfCards));
    }

    // Start the game
    function handleStart() {
        setShowImage(true);
        handleRandomize();

        // idx stands for index but already used below in the return - to avoid any bugs in code
        const idx = setInterval(() => {
            if (numberOfCards > 0) {
                const randomIndex = Math.floor(Math.random() * numberOfCards);
                setCurrentIndex(randomIndex);
            }
        }, cadence * 1000);

        setIntervalId(idx);
        console.log("Start");
    }

    // Stop the game
    function handleStop() {
        setNumberOfCards(null);
        setRandomNumbers([]);
        setShowImage(false);
        setCurrentIndex(null);
        if (intervalId) clearInterval(intervalId);
        console.log("Stop");
        setCadence(null);
    }

    return (
        <div className={styles.main}>
            <div className={styles.header}>
                <h1 className={styles.title}>
                    Welcome to Maxence's Boxing Workplace !!!
                </h1>
            </div>

            <div className={styles.gameContainerParent}>
                <div className={styles.gameContainer}>
                    <label className={styles.settingsGame}>
                        How many cards would you like to play with ?
                        <input
                            name="numberOfCards"
                            value={numberOfCards || ""}
                            onChange={handleNumberOfCards}
                            placeholder="Enter your number of cards"
                            className={styles.input}
                        />
                    </label>
                    <label className={styles.settingsGame}>
                        Which cadence would you like ?
                        <input
                            name="cadence"
                            value={cadence || ""}
                            onChange={handleCadence}
                            placeholder="Cadence in seconds"
                            className={styles.input}
                        />
                    </label>

                    <div>
                        {showImage && (
                            <Image
                                src="/InstructriceIntro.jpg"
                                alt="Teacher speaking"
                                className="imgIntro"
                                width={500}
                                height={300}
                            />
                        )}
                    </div>

                    <div className={styles.cardsContainer}>
                        {randomNumbers.map((num, index) => (
                            <Card
                                key={index}
                                value={num}
                                isHighlighted={index === currentIndex}
                            />
                        ))}
                    </div>

                    <div className={styles.buttonsGame}>
                        <button className={styles.button} onClick={handleStart}>
                            Start
                        </button>
                        <button className={styles.button} onClick={handleStop}>
                            Stop
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Home;
