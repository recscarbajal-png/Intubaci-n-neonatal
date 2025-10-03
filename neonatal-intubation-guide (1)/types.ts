// FIX: Import ReactElement to provide the type for JSX components.
import type { ReactElement } from 'react';

export type TabId = 'inicio' | 'intubacion' | 'equipo' | 'problemas' | 'practica';

export interface NavTab {
    id: TabId;
    label: string;
}

export interface StepperStep {
    icon: string;
    title: string;
    description: string;
}

export interface DoneItem {
    letter: string;
    term: string;
    details: string;
}

export interface EquipmentItem {
    name: string;
    // FIX: Replaced JSX.Element with ReactElement to resolve the "Cannot find namespace 'JSX'" error.
    icon: ReactElement;
    details: string[];
    bgColor: string;
}

export interface QuizQuestion {
    question: string;
    options: string[];
    answer: number;
}

export interface ChatMessage {
    role: 'user' | 'model';
    text: string;
}
