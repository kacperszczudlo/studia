import React, {useState} from 'react';

// pobranie pytań z pliku JSON
import questions from '../questions.json';
import Question from "./question";
import Answers from "./answers";
import Results from "./results";
import Actions from "./actions";
import Timer from "./timer";

const styles = {
    display: 'flex',
    justifyContent: 'center'
}

const QuizComponent = (props) => {


//Stworzenie niezbędnych hook;ów

    const [currentIndex, setIndex] = useState(0);
    const [currentQuestion, setQuestion] = useState(questions[currentIndex]);
    const [currentPoints, setPoints] = useState(0);
    const [allowToChoose, changePermission] = useState(true);
    const [markedAnswer, markAnswer] = useState({key: -1, variant: ''});
    const [timer, setTimer] = useState({sec: 10, active: true});
    const [answered, setAnswered] = useState(0);


// przejście do kolejnego pytania

    const handleNextQuestion = () => {
        const nextValue = currentIndex + 1;

        setIndex(nextValue);
        setQuestion(questions[nextValue]);
        if(currentIndex < answered) {
            changePermission(false);
            setTimer({sec: 1, active: false});
        } else {
            changePermission(true);
            setTimer({sec: 10, active: true});
            setAnswered(currentIndex - 1);
        }
        markAnswer({key: -1, variant: ''});

    };

// przejście do poprzedniego pytania

    const handlePrevQuestion = () => {
        const prevValue = currentIndex - 1;

        setIndex(prevValue);
        setQuestion(questions[prevValue]);
        changePermission(false);
        markAnswer({key: -1, variant: ''});
        setTimer({sec: 1, active: false});
    };


//sprawdzenie poprawnej odpowiedzi


    const handleCheckAnswer = (chosenOption, key) => {
        if (!allowToChoose) {
            return;
        }
        if (currentQuestion.correct_answer === chosenOption) {
            const points = currentPoints + 1;
            setPoints(points);
            changePermission(false);
            markAnswer({key, variant: 'bg-success'});
            setAnswered(currentIndex);
            setTimer({sec: 1, active: false});
        } else {
            changePermission(false);
            markAnswer({key, variant: 'bg-danger'});
            setAnswered(currentIndex);
            setTimer({sec: 1, active: false});
        }
    };

// obsługa timera
    const handleTimer = () => {
        if(timer.sec > 0) {
            setTimer({sec: timer.sec - 1, active: true});
        } else if(currentIndex !== questions.length - 1) {
            handleNextQuestion();
        } else {
            setAnswered(currentIndex);
            changePermission(false);
            setTimer({sec: 1, active: false});
        }
    }

// wyświetlenie zawartości

    return (
        <div style={styles}>
            <div className="containter">
                <p>Quiz</p>
                <Question
                    className="col-12"
                    currentQuestion={currentQuestion.question}
                    currentIndex={currentIndex + 1}
                    allQuestions={questions.length}
                >
                </Question>
                <Answers className="col-12"
                         checkAnswer={handleCheckAnswer}
                         currentAnswers={currentQuestion.answers}
                         markedAnswer={markedAnswer}
                />
                <Results points={currentPoints}/>
                <Actions
                    disablePrev={currentIndex > 0}
                    disableNext={currentIndex !== questions.length - 1}
                    prev={handlePrevQuestion}
                    next={handleNextQuestion}
                />
                <Timer
                    time={timer.sec}
                    disableTimer={timer.active}
                    runTimer={handleTimer}
                />
            </div>
        </div>
    )
};

export default QuizComponent;