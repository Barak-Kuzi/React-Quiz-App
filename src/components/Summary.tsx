import React from "react";

import quizCompleteLogo from "../assets/quiz-complete.png";
import {ArrayOfStringOrNull} from "./Quiz";
import {Questions} from "../questions";

interface SummaryProps {
    userAnswer: ArrayOfStringOrNull
}

export default function Summary({userAnswer}: SummaryProps): React.JSX.Element {

    const amountOfQuestions: number = Questions.length

    const arraySkippedQuestions: ArrayOfStringOrNull = userAnswer.filter((question) =>
        question === null);
    const amountSkippedQuestions: number =  Math.round((arraySkippedQuestions.length / amountOfQuestions) * 100);

    const arrayCorrectAnswers: ArrayOfStringOrNull = userAnswer.filter((answer,index) => {
        return answer === Questions[index].answers[0];
    });
    const amountCorrectAnswers: number = Math.round((arrayCorrectAnswers.length / amountOfQuestions) * 100);
    const amountIncorrectAnswers: number = Math.round(100 - (amountCorrectAnswers + amountSkippedQuestions));

    return (
        <div id="summary">
            <img src={quizCompleteLogo} alt="trophy logo of the completed quiz"/>
            <h2>Quiz Completed!</h2>
            <div id="summary-stats">
                <p>
                    <span className="number">{amountSkippedQuestions}%</span>
                    <span className="text">Skipped</span>
                </p>

                <p>
                    <span className="number">{amountCorrectAnswers}%</span>
                    <span className="text">Answered Correctly</span>
                </p>

                <p>
                    <span className="number">{amountIncorrectAnswers}%</span>
                    <span className="text">Answered Incorrectly</span>
                </p>
            </div>
            <ol>
                {Questions.map((question, index) => {
                    let cssClass: string = "user-answer";
                    if (userAnswer[index] === null) {
                        cssClass += ' skipped'
                    } else if (userAnswer[index] === Questions[index].answers[0]) {
                        cssClass += ' correct'
                    } else {
                        cssClass += ' wrong'
                    }

                    return (
                            <li key={question.id}>
                                <h3>{index + 1}</h3>
                                <p className="question">{question.text}</p>
                                <p className={cssClass}>{userAnswer[index] ?? 'Skipped'}</p>
                            </li>
                    )
                })}
            </ol>
        </div>
    );
}