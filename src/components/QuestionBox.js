import React, {useState} from 'react';

const QuestionBox = ({question, options, selected}) => {
    
    const [answerIndex, setAnswerIndex] = useState();

    //user's choice
    const choice = (index) => {
        const isSelected = answerIndex === index;
        return isSelected ? 'selectedBtn' : 'answerBtn';
    };
    
    return (
        <div className="questionBox">
            {/*the question*/}
            <div className="question">{question}</div>
            
            {/*map through answers and create button for each answer*/}
            {options.map((text, index) => (
                <button key={index} className={choice(index)} onClick={() => {
                    setAnswerIndex(index);
                    choice(index);
                    selected(text);
                }}>
                    {text}
                </button>
            ))}
        </div>
    );
};

export default QuestionBox;