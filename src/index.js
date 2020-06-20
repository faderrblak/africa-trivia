import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import './style/index.css';
import quizService from './quizService';
import QuestionBox from './components/QuestionBox';
import Result from './components/Result';

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [answerOptions, setAnswers] = useState([]);
  const [questionIds, setQuestionIds] = useState([]);
  const [displayScore, setDisplayScore] = useState(false);

  //fetch 5 random questions from quizService.js
  const getQuestions = () => {
    quizService().then(question => {
      setQuestions(question);
    });
  };

  useEffect(() => {
    getQuestions();
  }, []);

  //handle responses and allow user to change response
  const handleClick = (answer, qId) => {
    var array = [...questionIds];
    var array2 = [...answerOptions];
    var index = array.indexOf(qId);
    if (index > -1) {
      array.splice(index, 1);
      array2.splice(index, 1);
      setQuestionIds([array]);
      setAnswers([array2])
    }
    setQuestionIds(array.concat(qId));
    setAnswers(array2.concat(answer));
  }

  //Submit and count score
  const submitAnswers = () => {
    setDisplayScore(true);
  }
  
  //function to playAgain
  const playAgain = () => {
    getQuestions();
    setScore(0);
    setAnswers([])
    setQuestionIds([])
    setDisplayScore(false);
  };

  return(
    <div className="page">
      {/*title*/}
      <div className="title">Africa Trivia</div>
      
      {/*Lesss than 5 responses selected*/}
      {displayScore === false ? (<div className="instruction">Select an answer. Once you've answered all 5 you will see your result in the next page.</div>) : null}
      {questions.length > 0 && 
        displayScore === false && 
        questions.map(({question, answers, questionId}) => (
          <QuestionBox 
            question={question} 
            options={answers} 
            key={questionId}
            selected={answer => handleClick(answer, questionId)}
          />
      ))}
      
      {/*5 responses selected*/}
      {displayScore === true ? (<Result score={answerOptions} playAgain={playAgain}/>) : null}
      
      {/*submit button*/}
      {displayScore === false ? (<button className="playBtn" onClick={submitAnswers}>Submit</button>) : null}
      
      {/*footer*/}
      <div className="footer">{String.fromCharCode(169) + ' 2020. Faderr Johm'}</div>
    </div>
  )
};

ReactDOM.render(
  <Quiz/>,
  document.getElementById('root')
);


