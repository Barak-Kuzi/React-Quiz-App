import React, {SetStateAction, useState, useCallback} from "react";

import { Questions } from "../questions";
import Question from "./Question";
import Summary from "./Summary";

export type ArrayOfStringOrNull = Array<string | null>;
const INITIAL_USER_ANSWERS: ArrayOfStringOrNull = [];

export default function Quiz(): React.JSX.Element {
    const [userAnswers, setUserAnswers]: [ArrayOfStringOrNull, React.Dispatch<SetStateAction<ArrayOfStringOrNull>>]
        = useState(INITIAL_USER_ANSWERS);

    const currentQuestionIndex: number = userAnswers.length;

    const handleClickAnswer = useCallback(function handleClickAnswer(selectedAnswer: string | null) {
        setUserAnswers((prevUserAnswers: ArrayOfStringOrNull) => {
            return [
                ...prevUserAnswers,
                selectedAnswer
            ]
        });
    }, []);

    const handleSkipAnswer = useCallback(function handleSkipAnswer() {
        handleClickAnswer(null);
    }, [handleClickAnswer])


    const quizIsComplete: boolean = currentQuestionIndex === Questions.length

    if (quizIsComplete) {
        return (
            <Summary userAnswer={userAnswers} />
        );
    }

    return (
        <div id="quiz">
            <Question
                key={currentQuestionIndex}
                currentQuestionIndex={currentQuestionIndex}
                onSkipAnswer={handleSkipAnswer}
                onClickAnswer={handleClickAnswer}
            />
        </div>
    );
}