import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';

// import style sheet
import './style/index.css';

// import database from firebase file
import {db} from './firebase/index';

// import QuestionBox and Result component
import QuestionBox from './components/QuestionBox';
import Result from './components/Result';

const Quiz = () => {
  // fetch 5 questions from Firebase ----
  const [questions, setQuestions] = useState([]);

  const getQuestions = () => {
    db.collection("quizService").get()
    .then(response => {
      const allQuestions = [];
      response.docs.map(doc => {
        const question = {
          questionId: doc.id,
          ...doc.data()
        };
        allQuestions.push(question);
      });
      var index = Math.floor(Math.random() * allQuestions.length);
      var item = allQuestions.splice(index, 5);
      setQuestions(item);
    });
  };

  useEffect(() => {
    getQuestions();
  }, []);
  // END: fetch questions ------

  // handleClick and allow user to change response ------
  const [answerChoices, setAnswers] = useState([]);
  const [questionIds, setQuestionIds] = useState([]);

  const handleClick = (answer, qId) => {
    let array = [...questionIds];
    let array2 = [...answerChoices];
    let index = array.indexOf(qId);
    if (index > -1) {
      array.splice(index, 1);
      array2.splice(index, 1);
      setQuestionIds([array]);
      setAnswers([array2])
    };
    setQuestionIds(array.concat(qId));
    setAnswers(array2.concat(answer));
  };
  // END: handleClick event ------

  // check answers and calculate score ------
  const [score, setScore] = useState(0);
  const [checkAnswer, setCheck] = useState([]);

  const calcAnswer = (obj, qIds, anss) => {
    let correctAns = [];
    let answerCheck = [];

    qIds.map((itemId, i) => {
      let index = obj.map(e => e.questionId).indexOf(itemId);
      let check = obj[index].correct;
      let ans = anss[i];
      if (check === ans) {
        correctAns.push(ans);
        return answerCheck.push(["correct", obj[index].question, obj[index].correct])
      } else {
        return answerCheck.push(["wrong", obj[index].question, obj[index].correct])
      }
    });

    setScore(correctAns.length);
    setCheck(answerCheck);
  };
  // END: answer calculation ------

  //handle Submit and change display score ------
  const [displayScore, setDisplayScore] = useState(false);

  const submit = () => {
    setDisplayScore(true);
  };
  // END: handle Submit ------
  
  //handle playAgain function ------
  const playAgain = () => {
    getQuestions();
    setScore(0);
    setAnswers([]);
    setQuestionIds([]);
    setDisplayScore(false);
  };
  // END: handle playAgain function ------

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
      {displayScore === true ? (<Result score={score} results={checkAnswer} playAgain={playAgain}/>) : null}
      
      {/*submit button*/}
      {displayScore === false ? (<button className="playBtn" onClick={() => {submit(); calcAnswer(questions, questionIds, answerChoices)}}>Submit</button>) : null}
      
      {/*footer*/}
      <div className="footer">{String.fromCharCode(169) + ' 2020. Faderr Johm'}</div>
    </div>
  )
};

// render Quiz component to DOM ------
ReactDOM.render(
  <Quiz/>,
  document.getElementById('root')
);


