import React from 'react';
import { FaCheck, FaTimes } from "react-icons/fa";

const Result = ({score, results, playAgain}) => (
    <div className="score-board">
        <div className="score">You scored {score} / 5 correct answers!</div>
        <br/>
        {results.map(item => (
            <div className="results">
                {item[0] === "correct" ? <span style={{"color": "green"}}><FaCheck/></span> : <span style={{"color": "red"}}><FaTimes/></span>}
                <span className="question" style={{"margin-left":"5px"}}>{item[1]}</span>
            </div>
        ))}
        <br/>
        <button className="playBtn" onClick={playAgain}>
            Play Again!
        </button>
    </div>
);

export default Result;