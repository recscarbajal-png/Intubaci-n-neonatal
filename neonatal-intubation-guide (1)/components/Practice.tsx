
import React, { useState, useMemo } from 'react';
import { QUIZ_QUESTIONS } from '../constants';

const Quiz: React.FC = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState<(number | null)[]>(new Array(QUIZ_QUESTIONS.length).fill(null));
    const [showResults, setShowResults] = useState(false);

    const handleOptionSelect = (optionIndex: number) => {
        if (userAnswers[currentQuestionIndex] !== null) return; // Don't allow changing answer
        const newAnswers = [...userAnswers];
        newAnswers[currentQuestionIndex] = optionIndex;
        setUserAnswers(newAnswers);
    };

    const handleNext = () => {
        if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        } else {
            setShowResults(true);
        }
    };
    
    const handlePrev = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prev => prev - 1);
        }
    };

    const handleRestart = () => {
        setCurrentQuestionIndex(0);
        setUserAnswers(new Array(QUIZ_QUESTIONS.length).fill(null));
        setShowResults(false);
    };

    const score = useMemo(() => {
        return userAnswers.reduce((acc, answer, index) => {
            return acc + (answer === QUIZ_QUESTIONS[index].answer ? 1 : 0);
        }, 0);
    }, [userAnswers]);

    const questionData = QUIZ_QUESTIONS[currentQuestionIndex];
    const answeredIndex = userAnswers[currentQuestionIndex];

    if (showResults) {
        return (
             <div className="text-center">
                <h3 className="text-2xl font-bold">Resultados del Quiz</h3>
                <p className="text-lg mt-2">Has respondido <span className="font-bold text-blue-600">{score}</span> de <span className="font-bold">{QUIZ_QUESTIONS.length}</span> preguntas correctamente.</p>
                <button onClick={handleRestart} className="mt-4 bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 transition-colors">Volver a Intentar</button>
            </div>
        );
    }

    return (
        <div>
            <div id="quiz-container">
                <h4 className="text-lg font-semibold mb-4">{currentQuestionIndex + 1}. {questionData.question}</h4>
                <div className="space-y-3">
                    {questionData.options.map((option, index) => {
                        let optionClass = 'border-2 border-gray-300';
                        if (answeredIndex !== null) {
                            if (index === answeredIndex) {
                                optionClass = index === questionData.answer ? 'border-green-500 bg-green-100' : 'border-red-500 bg-red-100';
                            } else if (index === questionData.answer) {
                                optionClass = 'border-green-500 bg-green-100';
                            }
                        }
                        return (
                            <div
                                key={index}
                                onClick={() => handleOptionSelect(index)}
                                className={`p-3 rounded-lg transition ${answeredIndex === null ? 'cursor-pointer hover:bg-gray-100' : 'cursor-default'} ${optionClass}`}
                            >
                                {option}
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="mt-6 flex justify-between items-center">
                <button onClick={handlePrev} disabled={currentQuestionIndex === 0} className="bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-lg hover:bg-gray-400 disabled:opacity-50 transition-colors">Anterior</button>
                <div className="text-sm font-medium text-gray-600">Pregunta {currentQuestionIndex + 1} de {QUIZ_QUESTIONS.length}</div>
                <button onClick={handleNext} className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors">
                    {currentQuestionIndex === QUIZ_QUESTIONS.length - 1 ? 'Ver Resultados' : 'Siguiente'}
                </button>
            </div>
        </div>
    );
};


const Practice: React.FC = () => {
    return (
        <section id="practica" role="tabpanel" className="tab-content space-y-8">
            <div className="text-center">
                <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Pon a Prueba tu Conocimiento</h2>
                <p className="mt-4 text-lg text-gray-600">Responde estas preguntas para afianzar los conceptos clave.</p>
            </div>
            <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">
                <Quiz />
            </div>
        </section>
    );
};

export default Practice;
