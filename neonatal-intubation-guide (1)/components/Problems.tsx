
import React, { useState } from 'react';
import { DONE_DATA } from '../constants';
import type { DoneItem } from '../types';
import { ChevronDownIcon } from './icons/Icons';

const AccordionItem: React.FC<{ item: DoneItem, isOpen: boolean, onClick: () => void }> = ({ item, isOpen, onClick }) => {
    return (
        <div>
            <button
                className="w-full flex justify-between items-center text-left p-4 bg-white rounded-lg shadow-md hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75"
                onClick={onClick}
                aria-expanded={isOpen}
            >
                <span className="font-bold text-xl"><span className="text-blue-600">{item.letter}</span> - {item.term}</span>
                <ChevronDownIcon isOpen={isOpen} />
            </button>
            {isOpen && (
                <div className="accordion-content p-4 mt-2 bg-gray-50 rounded-b-lg">
                    <p>{item.details}</p>
                </div>
            )}
        </div>
    );
};

const Problems: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const handleItemClick = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section id="problemas" role="tabpanel" className="tab-content space-y-8">
            <div className="text-center">
                <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Resolución de Problemas: Regla DONE</h2>
                <p className="mt-4 text-lg text-gray-600">Ante un deterioro súbito post-intubación, piensa en DONE.</p>
            </div>
            <div className="max-w-3xl mx-auto space-y-4">
                {DONE_DATA.map((item, index) => (
                    <AccordionItem
                        key={index}
                        item={item}
                        isOpen={openIndex === index}
                        onClick={() => handleItemClick(index)}
                    />
                ))}
            </div>
        </section>
    );
};

export default Problems;
