
import React, { useState, useMemo } from 'react';
import { GoogleGenAI, Type } from '@google/genai';
import { CHECKLIST_ITEMS, STEPPER_STEPS, AI_QUIZ_INSTRUCTION } from '../constants';
import { InfoIcon, ChecklistIcon, SparklesIcon } from './icons/Icons';
import AnatomyModal from './AnatomyModal';
import type { QuizQuestion } from '../types';

// Checklist Component
const Checklist: React.FC = () => {
    const [checkedState, setCheckedState] = useState(
        new Array(CHECKLIST_ITEMS.length).fill(false)
    );

    const handleOnChange = (position: number) => {
        const updatedCheckedState = checkedState.map((item, index) =>
            index === position ? !item : item
        );
        setCheckedState(updatedCheckedState);
    };

    const completionPercentage = useMemo(() => {
        const checkedCount = checkedState.filter(Boolean).length;
        return (checkedCount / CHECKLIST_ITEMS.length) * 100;
    }, [checkedState]);

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-4 flex items-center text-gray-800">
                <ChecklistIcon />
                Equipo y Preparación
            </h3>
            <div className="mb-4">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${completionPercentage}%`, transition: 'width 0.5s' }}></div>
                </div>
                <p className="text-sm text-right mt-1 text-gray-600">{Math.round(completionPercentage)}% completado</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {CHECKLIST_ITEMS.map((item, index) => (
                    <label key={index} className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition">
                        <input
                            type="checkbox"
                            className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            checked={checkedState[index]}
                            onChange={() => handleOnChange(index)}
                        />
                        <span className="ml-3 text-gray-700">{item}</span>
                    </label>
                ))}
            </div>
        </div>
    );
};

// Calculators Component
const Calculators: React.FC = () => {
    const [weight, setWeight] = useState('');
    const [ga, setGa] = useState('');
    const [ntl, setNtl] = useState('');
    const [gaDepth, setGaDepth] = useState('');

    const tubeSize = useMemo(() => {
        const w = parseFloat(weight);
        const g = parseInt(ga, 10);
        if (w < 1 || g < 28) return '2.5 mm';
        if ((w >= 1 && w <= 2) || (g >= 28 && g <= 34)) return '3.0 mm';
        if (w > 2 || g > 34) return '3.5 mm';
        return '';
    }, [weight, ga]);

    const depth = useMemo(() => {
        if (ntl) {
            const n = parseFloat(ntl);
            return isNaN(n) ? '' : `${(n + 1).toFixed(1)} cm`;
        }
        if (gaDepth) {
            const g = parseInt(gaDepth, 10);
            const egDepthTable: { [key: number]: number } = {
                23: 5.5, 24: 5.5, 25: 6.0, 26: 6.0, 27: 6.5, 28: 6.5, 29: 6.5,
                30: 7.0, 31: 7.0, 32: 7.0, 33: 7.5, 34: 7.5, 35: 8.0, 36: 8.0,
                37: 8.0, 38: 8.5, 39: 8.5, 40: 8.5, 41: 9.0, 42: 9.0, 43: 9.0
            };
            return egDepthTable[g] ? `${egDepthTable[g].toFixed(1)} cm` : '';
        }
        return '';
    }, [ntl, gaDepth]);
    
    return (
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
             <h3 className="text-2xl font-bold mb-6 text-center text-gray-800">Simuladores Interactivos</h3>
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-5 rounded-lg shadow-sm">
                    <h4 className="font-bold text-lg mb-3 text-center">1. Calculadora de Tamaño de Tubo</h4>
                    <div className="space-y-4">
                         <div>
                            <label htmlFor="peso" className="block text-sm font-medium text-gray-700">Peso (kg)</label>
                            <input type="number" id="peso" step="0.1" value={weight} onChange={e => setWeight(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" placeholder="Ej: 1.5"/>
                        </div>
                        <div>
                            <label htmlFor="eg" className="block text-sm font-medium text-gray-700">Edad Gestacional (semanas)</label>
                            <input type="number" id="eg" value={ga} onChange={e => setGa(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" placeholder="Ej: 32"/>
                        </div>
                    </div>
                    <div className="mt-4 text-center font-bold text-xl h-8">
                        {tubeSize && <span>Tubo recomendado: <span className="text-blue-600">{tubeSize}</span></span>}
                    </div>
                </div>
                
                <div className="bg-white p-5 rounded-lg shadow-sm">
                    <h4 className="font-bold text-lg mb-3 text-center">2. Calculadora de Profundidad</h4>
                    <div className="space-y-3">
                        <div>
                            <label htmlFor="dnt" className="block text-sm font-medium text-gray-700">Opción A: DNT + 1 cm</label>
                            <input type="number" id="dnt" step="0.1" value={ntl} onChange={e => {setNtl(e.target.value); setGaDepth('')}} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" placeholder="Distancia Nariz-Trago (cm)"/>
                        </div>
                        <div>
                            <label htmlFor="eg-depth" className="block text-sm font-medium text-gray-700">Opción B: Por EG (semanas)</label>
                            <input type="number" id="eg-depth" value={gaDepth} onChange={e => {setGaDepth(e.target.value); setNtl('')}} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" placeholder="Edad Gestacional"/>
                        </div>
                    </div>
                    <div className="mt-4 text-center font-bold text-xl h-8">
                        {depth && <span>Profundidad: <span className="text-blue-600">{depth}</span></span>}
                    </div>
                </div>
             </div>
        </div>
    );
};

// Stepper Component
const Stepper: React.FC = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [isAnatomyModalOpen, setAnatomyModalOpen] = useState(false);
    
    const step = STEPPER_STEPS[currentStep];

    return (
        <>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-2xl font-bold mb-4 flex items-center text-gray-800">
                     <InfoIcon />
                    Técnica Paso a Paso Detallada
                </h3>
                <div className="border rounded-lg p-4 relative">
                    <div className="text-center transition-opacity duration-300 min-h-[150px]">
                        <div className="text-4xl mb-4">{step.icon}</div>
                        <h4 className="font-bold text-xl mb-2">{step.title}</h4>
                        <p className="text-gray-600" dangerouslySetInnerHTML={{ __html: step.description }}></p>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                        <button onClick={() => setCurrentStep(s => s - 1)} disabled={currentStep === 0} className="bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-lg hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed">Anterior</button>
                        <div className="flex items-center space-x-2">
                            {STEPPER_STEPS.map((_, index) => (
                                <div key={index} className={`w-3 h-3 rounded-full ${index === currentStep ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
                            ))}
                        </div>
                        <button onClick={() => setCurrentStep(s => s + 1)} disabled={currentStep === STEPPER_STEPS.length - 1} className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed">Siguiente</button>
                    </div>
                </div>
                 <div className="text-center mt-4">
                    <button onClick={() => setAnatomyModalOpen(true)} className="text-blue-600 hover:underline">Ver Esquema de Anatomía</button>
                 </div>
            </div>
            <AnatomyModal isOpen={isAnatomyModalOpen} onClose={() => setAnatomyModalOpen(false)} />
        </>
    );
};

// Video Card Component
const VideoCard: React.FC<{ src: string; title: string; description: string }> = ({ src, title, description }) => {
    const [quiz, setQuiz] = useState<{ question: QuizQuestion; userAnswer: number | null } | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleGenerateQuiz = async () => {
        setIsLoading(true);
        setError(null);
        setQuiz(null);

        if (!process.env.API_KEY) {
            setError("La clave de API no está configurada.");
            setIsLoading(false);
            return;
        }

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const prompt = `Basado en un video titulado "${title}" que trata sobre "${description}", genera una pregunta de opción múltiple para evaluar la comprensión del espectador. La pregunta debe ser clínicamente relevante y basarse en las mejores prácticas del Programa de Reanimación Neonatal (PRN). Proporciona la pregunta, 4 opciones y el índice (0-3) de la respuesta correcta.`;

            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
                config: {
                    systemInstruction: AI_QUIZ_INSTRUCTION,
                    responseMimeType: "application/json",
                    responseSchema: {
                        type: Type.OBJECT,
                        properties: {
                            question: { type: Type.STRING },
                            options: { type: Type.ARRAY, items: { type: Type.STRING } },
                            answer: { type: Type.INTEGER }
                        },
                        required: ["question", "options", "answer"]
                    },
                }
            });

            const parsed = JSON.parse(response.text);
            if (parsed.options.length !== 4) {
                 throw new Error("La IA generó un número incorrecto de opciones.");
            }
            setQuiz({ question: parsed, userAnswer: null });

        } catch (err) {
            console.error("Error generating quiz:", err);
            setError("No se pudo generar la pregunta. Inténtalo de nuevo.");
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleOptionSelect = (optionIndex: number) => {
        if (quiz && quiz.userAnswer === null) {
            setQuiz({ ...quiz, userAnswer: optionIndex });
        }
    };

    const questionData = quiz?.question;
    const answeredIndex = quiz?.userAnswer;

    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 flex flex-col transition-transform duration-300 hover:-translate-y-1">
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}> {/* 16:9 Aspect Ratio */}
                <iframe src={src} title={title} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="absolute top-0 left-0 w-full h-full" />
            </div>
            <div className="p-4 flex-grow bg-gray-50">
                <h4 className="font-bold text-gray-800">{title}</h4>
                <p className="text-sm text-gray-600 mt-1">{description}</p>
            </div>
            <div className="p-4 bg-gray-100 border-t">
                 <button onClick={handleGenerateQuiz} disabled={isLoading} className="w-full flex items-center justify-center gap-2 bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-wait transition-colors">
                    <SparklesIcon />
                    {isLoading ? 'Generando...' : 'Generar Pregunta Interactiva'}
                </button>
                {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}
                
                {quiz && questionData && (
                     <div className="mt-4 pt-4 border-t">
                        <h5 className="font-semibold mb-2">{questionData.question}</h5>
                        <div className="space-y-2">
                            {questionData.options.map((option, index) => {
                                let optionClass = 'border-gray-300';
                                if (answeredIndex !== null) {
                                    if (index === answeredIndex) {
                                        optionClass = index === questionData.answer ? 'border-green-500 bg-green-100' : 'border-red-500 bg-red-100';
                                    } else if (index === questionData.answer) {
                                        optionClass = 'border-green-500 bg-green-100';
                                    }
                                }
                                return (
                                    <div key={index} onClick={() => handleOptionSelect(index)} className={`p-2 rounded-md border-2 transition ${answeredIndex === null ? 'cursor-pointer hover:bg-gray-200' : 'cursor-default'} ${optionClass}`}>
                                        <p className="text-sm">{option}</p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};


// Main Component
const IntubationGuide: React.FC = () => {
    return (
        <section id="intubacion" role="tabpanel" className="tab-content space-y-12">
            <div className="text-center">
                <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Guía Práctica de Intubación Neonatal</h2>
                <p className="mt-4 text-lg text-gray-600">Todo lo que necesitas para el procedimiento: indicaciones, equipo, técnica y simuladores.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-2xl font-bold mb-4 flex items-center text-gray-800">
                    <InfoIcon />
                    Objetivos e Indicaciones
                </h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li>Intubar si la <strong>Frecuencia Cardíaca (FC) es &lt;100 lpm</strong> y no aumenta tras una VPP efectiva.</li>
                    <li>Asegurar la vía aérea <strong>antes de iniciar compresiones torácicas</strong>.</li>
                    <li>Vía para <strong>aspirar secreciones espesas</strong> (p. ej., meconio) de la tráquea.</li>
                    <li>Administración de <strong>surfactante</strong>.</li>
                    <li>Estabilización en casos de <strong>hernia diafragmática congénita</strong>.</li>
                    <li>Considerar si se requiere <strong>VPP prolongada</strong>.</li>
                </ul>
            </div>
            
            <Checklist />
            <Calculators />
            <Stepper />

            <div className="bg-white p-6 rounded-lg shadow-md">
                 <h3 className="text-2xl font-bold mb-6 text-center text-gray-800">Demostraciones en Video</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <VideoCard
                        src="https://www.youtube.com/embed/abJqZsNVO8Y"
                        title="Material para Intubación"
                        description="Fuente: AAP, Reanimación Neonatal, 8.ª ed."
                    />
                    <VideoCard
                        src="https://www.youtube.com/embed/8cGBeD9RNts"
                        title="Procedimiento de Intubación"
                        description="Demostración visual del proceso paso a paso."
                    />
                    <VideoCard
                        src="https://www.youtube.com/embed/WC0coIBdWWE"
                        title="Distancia Nariz-Trago (DNT)"
                        description="Cómo medir para estimar la profundidad de inserción."
                    />
                 </div>
            </div>
        </section>
    );
};

export default IntubationGuide;