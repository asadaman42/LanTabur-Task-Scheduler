import React, { createContext, useState } from 'react';


export const UniversalContext = createContext(); 


const ContextSupplier = ({children}) => {
    
    /* Dark Mode Setup */
    const [mode, setMode] = useState("light");




    const contextInformation = {
        setMode,
        mode,
    }
    return (
        <div>
            <UniversalContext.Provider value={contextInformation}>
                {children}
            </UniversalContext.Provider>
        </div>
    );
};

export default ContextSupplier;