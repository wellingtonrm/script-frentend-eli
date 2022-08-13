import React, { createContext, useState, useEffect, } from 'react';

interface StateType {
    
}


const StateContext = createContext<StateType>({} as StateType);


 

function StateProvider({ children }: any) {


    return (<>
        <StateContext.Provider value={{ }}>
            {children}
        </StateContext.Provider>


    </>);
}

export { StateProvider, StateContext }