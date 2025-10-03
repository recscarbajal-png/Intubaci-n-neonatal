
import React from 'react';
import { EQUIPMENT_DATA } from '../constants';
import type { EquipmentItem } from '../types';

const EquipmentCard: React.FC<{ item: EquipmentItem }> = ({ item }) => (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-1 transition-transform duration-300">
        <div className={`${item.bgColor} p-4 flex justify-center items-center h-40`}>
            {item.icon}
        </div>
        <div className="p-6">
            <h3 className="font-bold text-xl mb-2">{item.name}</h3>
            {item.details.length > 1 ? (
                 <ul className="list-disc list-inside text-gray-700 space-y-1">
                    {item.details.map((detail, index) => (
                        <li key={index} dangerouslySetInnerHTML={{ __html: detail }}></li>
                    ))}
                 </ul>
            ) : (
                <p className="text-gray-700" dangerouslySetInnerHTML={{ __html: item.details[0] }}></p>
            )}
        </div>
    </div>
);

const Equipment: React.FC = () => {
    return (
        <section id="equipo" role="tabpanel" className="tab-content space-y-8">
            <div className="text-center">
                <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Material Esencial para Intubación</h2>
                <p className="mt-4 text-lg text-gray-600">Conoce tu equipo. La preparación es clave para el éxito.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {EQUIPMENT_DATA.map((item, index) => (
                    <EquipmentCard key={index} item={item} />
                ))}
            </div>
        </section>
    );
};

export default Equipment;
