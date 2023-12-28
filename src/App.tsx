import React from 'react';
import './App.css';

import Header from "./components/Header";
import Quiz from "./components/Quiz";

function App(): React.JSX.Element {
    return (
        <>
            <Header />
            <Quiz />
        </>
    );
}

export default App;
