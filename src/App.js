import React, { useState } from "react";
import "./App.css";

// Functions show the compentents of the card and board
function Card({ value, isFlipped, onClick }) {
    return (
        <button
            className={`card ${isFlipped ? "flipped" : ""}`}
            onClick={onClick}
        >
            {isFlipped ? value : "?"}
        </button>
    );
}

// I can't figure out why it won't match the letters and stay on. 
// It keeps changing the letters back to orignal 
function Board({ cards, flippedCards, handleCardClick }) {
    return (
        <div className="board">
            {cards.map((card, index) => (
                <Card
                    key={index}
                    value={card.value}
                    isFlipped={flippedCards.includes(index)}
                    onClick={() => handleCardClick(index)}
                />
            ))}
        </div>
    );
}

function App() {

    const [cards, setCards] = useState(shuffleCards());
    const [flippedCards, setFlippedCards] = useState([]);
    const [matchedCards, setMatchedCards] = useState([]);
    const [moveCount, setMoveCount] = useState(0);

    const handleCardClick = (index) => {
        if (flippedCards.length === 2 || flippedCards.includes(index)) {
            return;
        }

        const newFlippedCards = [...flippedCards, index];
        setFlippedCards(newFlippedCards);

        if (newFlippedCards.length === 2) {
            setMoveCount((prev) => prev + 1);
            const [first, second] = newFlippedCards;
            if (cards[first].value === cards[second].value) {
                setMatchedCards((prev) => [...prev, first, second]);
            }

            setTimeout(() => setFlippedCards([]), 1000);
        }
    };

    // Restarting the game
    const restartGame = () => {
        setCards(shuffleCards());
        setFlippedCards([]);
        setMatchedCards([]);
        setMoveCount(0);
    };

    // How it checks if the game is complete.
    const isGameComplete = matchedCards.length === cards.length;

    return (
        <div className="app">
            <h1>Memory Matching Game</h1>
            <p>Moves: {moveCount}</p>
            {isGameComplete && <p>Congratulations! You matched all pairs!</p>}
            <Board
                cards={cards}
                flippedCards={[...flippedCards, ...matchedCards]}
                handleCardClick={handleCardClick}
            />
            <button onClick={restartGame}>Restart</button>
        </div>
    );
}

// How it will suhffle the cards.
function shuffleCards() {
    const cardValues = ["A", "B", "C", "D", "E", "F", "G", "H"];
    const pairedCards = [...cardValues, ...cardValues];
    return pairedCards.sort(() => Math.random() - 0.5).map((value) => ({ value }));
}

export default App;
