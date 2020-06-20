import React from 'react';
import { FaCheck, FaTimes } from "react-icons/fa";

const Result = ({score, results, playAgain}) => (
    <div className="score-board">
        <div className="score">You scored {score} / 5 correct answers!</div>
        <br/>
        {results.map(item => (
            <div>
                {item[0] === "correct" ? <div><FaCheck/></div> : <div><FaTimes/></div>}
                <div>{item[1]}</div>
            </div>
        ))}
        <br/>
        <button className="playBtn" onClick={playAgain}>
            Play Again!
        </button>
    </div>
);

export default Result;