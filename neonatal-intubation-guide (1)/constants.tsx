
import React from 'react';
import type { NavTab, StepperStep, DoneItem, EquipmentItem, QuizQuestion } from './types';
import { ChecklistIcon, CO2Icon, HeartIcon, IntubationTubeIcon, LaryngoscopeIcon, RescueIcon, SuctionIcon } from './components/icons/Icons';


export const NAV_TABS: NavTab[] = [
    { id: 'inicio', label: 'Inicio' },
    { id: 'intubacion', label: 'Guía de Intubación' },
    { id: 'equipo', label: 'Equipo' },
    { id: 'problemas', label: 'Problemas (DONE)' },
    { id: 'practica', label: 'Práctica' },
];

export const AI_SYSTEM_INSTRUCTION = 'Eres un asistente de IA especializado en el Programa de Reanimación Neonatal (PRN). Tu rol principal es educar a profesionales de la salud. Proporciona información precisa, segura y basada en la evidencia de las últimas guías del PRN. Prioriza siempre la seguridad del paciente. No ofrezcas consejos médicos para pacientes específicos.';
export const AI_QUIZ_INSTRUCTION = 'Eres un educador médico experto especializado en reanimación neonatal. Tu tarea es crear preguntas de opción múltiple clínicamente relevantes basadas en los temas de los videos para evaluar el conocimiento del usuario. Las preguntas deben ser precisas y alinearse con las últimas guías del Programa de Reanimación Neonatal (PRN).';

export const CHECKLIST_ITEMS: string[] = [
    "Laringoscopio (hoja 0 y 1)",
    "Tubos Endotraqueales (2.5, 3.0, 3.5)",
    "Estilete (opcional)",
    "Detector de CO₂",
    "Equipo de succión (80-100 mmHg)",
    "Reanimador (bolsa o pieza en T)",
    "Pulsioxímetro y estetoscopio",
    "Cinta de fijación y LMA #1 (rescate)",
];

export const STEPPER_STEPS: StepperStep[] = [
    {
        icon: '🖐️',
        title: 'Paso 1: Preparación y Posición',
        description: 'Reúne todo el equipo. Coloca al neonato en posición de "olfateo" con un rollo bajo los hombros para alinear los ejes laríngeo, faríngeo y oral.'
    },
    {
        icon: '🔦',
        title: 'Paso 2: Laringoscopia',
        description: 'Sostén el laringoscopio con la <strong>mano izquierda</strong>. Inserta la hoja por el lado derecho de la boca, desplaza la lengua a la izquierda y avanza hasta la <strong>valécula</strong> (la base de la lengua).'
    },
    {
        icon: '⬆️',
        title: 'Paso 3: Visualización de la Glotis',
        description: 'Eleva el laringoscopio en la dirección del mango (hacia arriba y adelante) <strong>sin mecer la muñeca</strong>. Visualizarás la epiglotis y, debajo, las cuerdas vocales en forma de "V".'
    },
    {
        icon: '🎯',
        title: 'Paso 4: Inserción del Tubo',
        description: 'Introduce el tubo por el <strong>lado derecho de la boca</strong>, observando cómo pasa a través de las cuerdas vocales. Avanza hasta que las marcas guía estén a nivel de las cuerdas.'
    },
    {
        icon: '✅',
        title: 'Paso 5: Retirada y Conexión',
        description: 'Mantén el tubo fijo, retira el laringoscopio y luego el estilete. Conecta el detector de CO₂ y el reanimador. El intento completo debe durar <strong>&le;30 segundos</strong>.'
    }
];

export const DONE_DATA: DoneItem[] = [
    {
        letter: 'D',
        term: 'Desplazamiento',
        details: 'El tubo se ha movido (muy profundo en bronquio derecho o muy superficial en faringe). Verifica la profundidad en el labio, ausculta y confirma con CO₂.'
    },
    {
        letter: 'O',
        term: 'Obstrucción',
        details: 'El tubo está bloqueado por secreciones. Intenta aspirar con una sonda. Si no se resuelve, considera extubar y ventilar con mascarilla.'
    },
    {
        letter: 'N',
        term: 'Neumotórax',
        details: 'Acumulación de aire en el espacio pleural. Sospecha si hay asimetría torácica, ruidos respiratorios disminuidos y deterioro hemodinámico. Requiere toracocentesis.'
    },
    {
        letter: 'E',
        term: 'Equipo',
        details: 'Falla en el equipo de ventilación (fuente de oxígeno, reanimador, conexiones). Revisa todo el circuito desde el gas hasta el paciente.'
    }
];

export const EQUIPMENT_DATA: EquipmentItem[] = [
    {
        name: "Laringoscopio",
        icon: <LaryngoscopeIcon />,
        bgColor: 'bg-blue-100',
        details: [
            "<strong>Hoja recta (Miller)</strong> es la preferida.",
            "<strong>Nº 1:</strong> Neonato a término.",
            "<strong>Nº 0:</strong> Neonato prematuro.",
            "<strong>Nº 00:</strong> Prematuro extremo (opcional)."
        ]
    },
    {
        name: "Tubos Endotraqueales (ETT)",
        icon: <IntubationTubeIcon />,
        bgColor: 'bg-green-100',
        details: [
            "<strong>2.5 mm:</strong> &lt;1 kg o &lt;28 sem.",
            "<strong>3.0 mm:</strong> 1-2 kg o 28-34 sem.",
            "<strong>3.5 mm:</strong> &gt;2 kg o &gt;34 sem."
        ]
    },
    {
        name: "Detector de CO₂",
        icon: <CO2Icon />,
        bgColor: 'bg-yellow-100',
        details: [
            "Confirmación primaria de la posición del tubo.",
            "Cambia de <strong>violeta a amarillo</strong> con el CO₂ exhalado.",
            "Esencial."
        ]
    },
    {
        name: "Equipo de Succión",
        icon: <SuctionIcon />,
        bgColor: 'bg-purple-100',
        details: [
            "Presión negativa: <strong>80-100 mmHg</strong>.",
            "Sonda <strong>10F</strong> para faringe.",
            "Sonda <strong>8F o 5-6F</strong> para ETT."
        ]
    },
    {
        name: "Monitorización",
        icon: <HeartIcon />,
        bgColor: 'bg-red-100',
        details: [
            "<strong>Pulsioxímetro:</strong> esencial para evaluar FC y SatO₂.",
            "<strong>Estetoscopio:</strong> para auscultación y confirmación secundaria."
        ]
    },
    {
        name: "Vía Aérea de Rescate",
        icon: <RescueIcon />,
        bgColor: 'bg-indigo-100',
        details: [
            "<strong>Mascarilla Laríngea (LMA) Nº 1.</strong>",
            "Alternativa si la intubación no es exitosa o posible."
        ]
    }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
    {
        question: "¿Cuál es la indicación principal para intubar a un neonato durante la RCP?",
        options: ["FC < 120 lpm", "FC < 100 lpm a pesar de VPP efectiva", "Cianosis central", "Bajo puntaje de Apgar"],
        answer: 1
    },
    {
        question: "Para un neonato de 1.8 kg y 33 semanas de EG, ¿qué tamaño de tubo endotraqueal es el más apropiado?",
        options: ["2.5 mm", "3.0 mm", "3.5 mm", "4.0 mm"],
        answer: 1
    },
    {
        question: "¿Cuál es el tiempo máximo recomendado para un intento de intubación?",
        options: ["10 segundos", "20 segundos", "30 segundos", "45 segundos"],
        answer: 2
    },
    {
        question: "La confirmación PRIMARIA y más fiable de la correcta colocación del tubo es:",
        options: ["Murmullo vesicular bilateral", "Movimiento simétrico del tórax", "Detector de CO₂ con cambio de color y aumento de FC", "Vapor en el tubo"],
        answer: 2
    },
    {
        question: "Si un neonato intubado se deteriora súbitamente, y sospechas un neumotórax, ¿a qué letra de la regla DONE corresponde?",
        options: ["D (Desplazamiento)", "O (Obstrucción)", "N (Neumotórax)", "E (Equipo)"],
        answer: 2
    },
     {
        question: "Al realizar una laringoscopia, ¿dónde se debe colocar la punta de la hoja recta (Miller)?",
        options: ["Sobre la epiglotis", "En la valécula (base de la lengua)", "Debajo de las cuerdas vocales", "En el esófago"],
        answer: 1
    }
];