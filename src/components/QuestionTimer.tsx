import React, {useEffect, useState, SetStateAction} from "react";

interface QuestionTimerProps {
    onSelectAnswer: Function,
    timeout: number,
    mode: string,
    selectedAnswer: string
}

export default function QuestionTimer({onSelectAnswer,
                                          timeout,
                                          mode,
                                          selectedAnswer}: QuestionTimerProps): React.JSX.Element {
    const [remainingTime, setRemainingTime]: [number, React.Dispatch<SetStateAction<number>>]
        = useState(timeout);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (selectedAnswer === ''){
                onSelectAnswer(null);
            }
        }, timeout);

        return () => {
            clearTimeout(timer);
        }
    }, [onSelectAnswer, timeout, selectedAnswer]);

    useEffect(() => {
        const interval = setInterval(() => {
            setRemainingTime((prevRemainingTime) => {
                return prevRemainingTime - 100;
            })
        }, 100);

        return () => {
            clearInterval(interval);
        }
    }, []);

    return (
        <progress
            id="question-time"
            value={remainingTime}
            max={timeout}
            className={mode}
        />
    );
}