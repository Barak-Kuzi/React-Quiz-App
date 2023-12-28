import React from "react";
import logoQuiz from "../assets/quiz-logo.png"

export default function Header(): React.JSX.Element {
    return (
        <header>
            <img src={logoQuiz} alt="Quiz-logo" />
            <h1>React-Quiz</h1>
        </header>
    );
}