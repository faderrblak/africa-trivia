import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import './style/index.css';
import quizService from './quizService';
import QuestionBox from './components/QuestionBox';
import Result from './components/Result';
import ReactGA from 'react-ga';
import auth from './auth.ts';

const trackingId = "UA-169836644-1";
ReactGA.initialize(trackingId);
ReactGA.set({
  userId: auth.currentUserId(),
});

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [response, setResponse] = useState(0);

  const getQuestions = () => {
    quizService().then(question => {
      setQuestions(question);
    });
  };

  useEffect(() => {
    getQuestions();
  }, []);

  const computeAnswer = (answer, correctAnswer) => {
    if (answer === correctAnswer) {
      setScore(score + 1)
    };
    setResponse(response < 5 ? response + 1 : 5);
  }
  
  const playAgain = () => {
    getQuestions();
    setScore(0);
    setResponse(0);
  };

  return(
    <div className="page">
      <div className="title">Africa Trivia</div>
      {response < 5 ? (<div className="instruction">Select an answer. Once you've answered all 5 you will see your result in the next page.</div>) : null}
      {questions.length > 0 && 
        response < 5 && 
        questions.map(({question, answers, correct, questionId}) => (
        <QuestionBox 
          question={question} 
          options={answers} 
          key={questionId}
          selected={answer => computeAnswer(answer, correct)}
        />
      ))}
      {response === 5 ? (<Result score={score} playAgain={playAgain}/>) : null}
      <div className="footer">{String.fromCharCode(169) + ' 2020. Faderr Johm'}</div>
    </div>
  )
};

ReactDOM.render(
  <Quiz/>,
  document.getElementById('root')
);


