
import React, { useState, useCallback } from 'react';
import type { TabId } from './types';
import Header from './components/Header';
import Home from './components/Home';
import IntubationGuide from './components/IntubationGuide';
import Equipment from './components/Equipment';
import Problems from './components/Problems';
import Practice from './components/Practice';
import Chatbot from './components/Chatbot';

const App: React.FC = () => {
    const [activeTab, setActiveTab] = useState<TabId>('inicio');

    const handleTabChange = useCallback((tabId: TabId) => {
        setActiveTab(tabId);
        window.location.hash = tabId;
    }, []);

    const renderContent = () => {
        switch (activeTab) {
            case 'inicio':
                return <Home onNavigateToIntubation={() => handleTabChange('intubacion')} />;
            case 'intubacion':
                return <IntubationGuide />;
            case 'equipo':
                return <Equipment />;
            case 'problemas':
                return <Problems />;
            case 'practica':
                return <Practice />;
            default:
                return <Home onNavigateToIntubation={() => handleTabChange('intubacion')} />;
        }
    };

    return (
        <>
            <Header activeTab={activeTab} onTabChange={handleTabChange} />
            <main className="container mx-auto p-4 sm:p-6 lg:p-8">
                {renderContent()}
            </main>
            <Chatbot />
        </>
    );
};

export default App;