import React, {useState, SetStateAction} from 'react';

import QuestionTimer from "./QuestionTimer";
import {Questions} from "../questions";
import Answers from "./Answers";

interface QuestionProps {
    currentQuestionIndex: number,
    onSkipAnswer: () => void,
    onClickAnswer: Function,

}

interface Answer {
    selectedAnswer: string,
    isCorrect: boolean | null
}

const INITIAL_ANSWER: Answer = {
    selectedAnswer: '',
    isCorrect: null
}

export default function Question({currentQuestionIndex,
                                     onSkipAnswer,
                                     onClickAnswer}: QuestionProps): React.JSX.Element {

    const [answer, setAnswer]: [Answer, React.Dispatch<SetStateAction<Answer>>] = useState(INITIAL_ANSWER);

    // The time it takes to answer the question
    let timer: number = 10000;

    if (answer.selectedAnswer) {
        // The time it takes to reveal the answer status
        timer = 1000;
    }

    if (answer.isCorrect !== null) {
        // The time it takes to move on to the next question
        timer = 1100;
    }

    function handleSelectAnswer(answerText: string): void {
        setAnswer({
            selectedAnswer: answerText,
            isCorrect: null
        })
        // To check if the answer is true or false.
        // That will take 1 second until I reveal the status of my answer
        setTimeout(() => {
            setAnswer({
                selectedAnswer: answerText,
                isCorrect: Questions[currentQuestionIndex].answers[0] === answerText
            });

            // To forward the selected answer to a quiz component
            setTimeout(() => {
                onClickAnswer(answerText);
            }, 1100);

        }, 1000)
    }

    let answerState: string = '';

    if (answer.selectedAnswer && answer.isCorrect !== null) {
        answerState = answer.isCorrect ? 'correct' : 'wrong';
    } else if (answer.selectedAnswer) {
        answerState = 'answered';
    }

    return (
        <div id="question">
            <QuestionTimer
                key={currentQuestionIndex}
                onSelectAnswer={onSkipAnswer}
                timeout={timer}
                mode={answerState}
                selectedAnswer={answer.selectedAnswer}
            />
            <h2>{Questions[currentQuestionIndex].text}</h2>
            <Answers
                answers={Questions[currentQuestionIndex].answers}
                answerState={answerState}
                onClickAnswer={handleSelectAnswer}
                selectedAnswer={answer.selectedAnswer}
            />
        </div>
    );
}