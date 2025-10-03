
import React from 'react';

interface TimelineStepProps {
    step: number;
    title: string;
    description: string;
    color: string;
    isClickable?: boolean;
    onClick?: () => void;
}

const TimelineStep: React.FC<TimelineStepProps> = ({ step, title, description, color, isClickable = false, onClick }) => {
    const baseClasses = "timeline-step w-full max-w-md bg-white p-4 rounded-lg shadow-lg relative transition-all duration-300 ease-in-out";
    const hoverClasses = isClickable ? "hover:transform hover:-translate-y-1 hover:shadow-xl cursor-pointer" : "";
    const borderClass = `border-t-4 ${color}`;
    const ringClass = isClickable ? "ring-2 ring-blue-500 ring-offset-2" : "";
    const bgColor = isClickable ? "bg-blue-50" : "";
    
    const numberBgColor = color.replace('border', 'bg').replace('-t-4', '');

    return (
        <div className={`${baseClasses} ${hoverClasses} ${borderClass} ${ringClass} ${bgColor}`} onClick={onClick}>
            <div className={`absolute -top-4 left-1/2 -translate-x-1/2 ${numberBgColor} text-white rounded-full h-8 w-8 flex items-center justify-center font-bold`}>{step}</div>
            <h3 className={`text-center font-semibold mt-4 ${isClickable ? 'text-blue-700' : ''}`}>{title}</h3>
            <p className="text-sm text-center text-gray-500 mt-2" dangerouslySetInnerHTML={{ __html: description }}></p>
        </div>
    );
};


interface HomeProps {
    onNavigateToIntubation: () => void;
}

const Home: React.FC<HomeProps> = ({ onNavigateToIntubation }) => {
    return (
        <section id="inicio" role="tabpanel" className="tab-content space-y-8 animate-fade-in">
            <div className="text-center">
                <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Flujo de Reanimación Neonatal</h2>
                <p className="mt-4 text-lg text-gray-600">Una guía visual del algoritmo de RCP. Haz clic en "Intubación" para explorar el procedimiento en detalle.</p>
            </div>
            <div className="relative w-full p-4">
                <div className="flex flex-col items-center space-y-8">
                    <TimelineStep step={1} title="Nacimiento" description="Evaluar: ¿Término? ¿Tono? ¿Respira/llora?" color="border-gray-300" />
                    <div className="text-gray-400 font-bold text-3xl">&darr;</div>
                    <TimelineStep step={2} title="Pasos Iniciales" description="Calor, secar, estimular, posicionar vía aérea, aspirar si es necesario." color="border-yellow-400" />
                    <div className="text-gray-400 font-bold text-3xl">&darr;</div>
                    <TimelineStep step={3} title="Evaluar FC y Resp." description="Apnea/gasping o FC &lt;100 lpm &rarr; Iniciar VPP." color="border-orange-500" />
                    <div className="text-gray-400 font-bold text-3xl">&darr;</div>
                    <TimelineStep
                        step={4}
                        title="Intubación Endotraqueal"
                        description="Considerar si VPP no es efectiva o se anticipan compresiones. <strong>¡Haz clic aquí!</strong>"
                        color="border-blue-500"
                        isClickable={true}
                        onClick={onNavigateToIntubation}
                    />
                    <div className="text-gray-400 font-bold text-3xl">&darr;</div>
                    <TimelineStep step={5} title="Compresiones" description="Si FC &lt;60 lpm a pesar de VPP efectiva. Coordinar 3:1 con ventilaciones." color="border-red-500" />
                </div>
            </div>
        </section>
    );
};

export default Home;
