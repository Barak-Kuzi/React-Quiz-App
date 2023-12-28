import React, {useRef} from "react";

interface AnswersProps {
    answers: Array<string>,
    selectedAnswer: string,
    answerState: string,
    onClickAnswer: Function,
}

export default function Answers({answers, selectedAnswer, answerState, onClickAnswer}: AnswersProps): React.JSX.Element {
    const shufflingAnswers: React.MutableRefObject<Array<string> | undefined> = useRef();

    if (!shufflingAnswers.current) {
        shufflingAnswers.current = [...answers];
        shufflingAnswers.current.sort(() => Math.random() - 0.5);
    }


    return (
        <ul id="answers">
            {shufflingAnswers.current.map(answer => {
                const isSelected: boolean = selectedAnswer === answer;
                let cssClass: string = '';

                if (answerState === 'answered' && isSelected) {
                    cssClass = 'selected';
                }

                if ((answerState === 'correct' || answerState === 'wrong') && isSelected) {
                    cssClass = answerState;
                }

                return (
                    <li key={answer} className="answer">
                        <button
                            onClick={() => onClickAnswer(answer)}
                            className={cssClass}
                            disabled={answerState !== ''}
                        >
                            {answer}
                        </button>
                    </li>)
            })}
        </ul>
    );
}