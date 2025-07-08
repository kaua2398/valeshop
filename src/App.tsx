import React, { useState } from 'react';
import { useEffect } from 'react';
import Sidebar from './components/Sidebar';
import FormRenderer from './components/FormRenderer';
import { FormType } from './types/FormTypes';

function App() {
  const [activeForm, setActiveForm] = useState<FormType>('cadastrar-usuario');

  // Clear any stored data on app initialization
  useEffect(() => {
    // Clear any potential localStorage or sessionStorage
    localStorage.clear();
    sessionStorage.clear();
    
    // Force garbage collection of any cached data
    if (window.gc) {
      window.gc();
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar activeForm={activeForm} onFormChange={setActiveForm} />
      <main className="flex-1 ml-64 p-8">
        <FormRenderer activeForm={activeForm} />
      </main>
    </div>
  );
}

export default App;