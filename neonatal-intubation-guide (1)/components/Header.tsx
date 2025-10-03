
import React from 'react';
import { NAV_TABS } from '../constants';
import type { TabId } from '../types';

interface HeaderProps {
    activeTab: TabId;
    onTabChange: (tabId: TabId) => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange }) => {
    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-shrink-0">
                        <h1 className="text-xl md:text-2xl font-bold text-blue-600">RCP Neonatal: Intubación</h1>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4" role="tablist" aria-label="Navegación principal">
                            {NAV_TABS.map(tab => (
                                <a
                                    key={tab.id}
                                    href={`#${tab.id}`}
                                    role="tab"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        onTabChange(tab.id);
                                    }}
                                    className={`px-3 py-2 rounded-md text-sm font-medium border-b-2 transition-colors duration-200 ${
                                        activeTab === tab.id
                                            ? 'border-blue-500 text-blue-600 bg-blue-50'
                                            : 'border-transparent text-gray-600 hover:bg-gray-100 hover:border-gray-300'
                                    }`}
                                    aria-selected={activeTab === tab.id}
                                >
                                    {tab.label}
                                </a>
                            ))}
                        </div>
                    </div>
                    <div className="md:hidden">
                        <select
                            id="mobile-nav"
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            value={activeTab}
                            onChange={(e) => onTabChange(e.target.value as TabId)}
                        >
                            {NAV_TABS.map(tab => (
                                <option key={tab.id} value={tab.id}>
                                    {tab.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
