
import React from 'react';
import { CloseIcon } from './icons/Icons';

interface AnatomyModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AnatomyModal: React.FC<AnatomyModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            <div 
                className="bg-white rounded-lg shadow-xl max-w-2xl w-full relative animate-fade-in-up"
                onClick={e => e.stopPropagation()}
            >
                <button 
                    onClick={onClose} 
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                    aria-label="Cerrar modal"
                >
                    <CloseIcon />
                </button>
                <div className="p-6">
                    <h3 className="text-xl font-bold text-center mb-4">Anatomía de la Vía Aérea Superior</h3>
                    <svg viewBox="0 0 300 250" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
                        <path d="M 150,20 C 120,50 120,100 150,130 S 180,50 150,20 Z" fill="#fecaca" stroke="#ef4444" strokeWidth="2"/>
                        <text x="150" y="15" fontSize="10" textAnchor="middle" fill="#7f1d1d">Epiglotis</text>
                        
                        <rect x="135" y="130" width="30" height="100" fill="#bae6fd" stroke="#0ea5e9" strokeWidth="2" />
                        <text x="150" y="245" fontSize="10" textAnchor="middle">Tráquea</text>
                        
                        <path d="M 135,135 L 120,120 M 165,135 L 180,120" stroke="#fca5a5" strokeWidth="3"/>
                        <text x="100" y="120" fontSize="10">Cuerdas Vocales</text>

                        <path d="M 150,110 C 160,110 160,120 150,120 C 140,120 140,110 150,110" fill="none" stroke="#4b5563" strokeWidth="1.5"/>
                        <text x="185" y="115" fontSize="10">Glotis (apertura)</text>

                         <path d="M 180,130 C 190,150 190,200 180,230" fill="#fed7aa" stroke="#f97316" strokeWidth="2" strokeDasharray="4"/>
                        <text x="215" y="180" fontSize="10">Esófago</text>

                        <path d="M 150, 15 L 150, 0 M 130, 80 L 100, 70" stroke="#4b5563" strokeWidth="1"/>
                        <text x="80" y="65" fontSize="10">Valécula</text>
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default AnatomyModal;
