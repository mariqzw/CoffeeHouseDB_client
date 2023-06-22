import React from 'react'
import CoffeeStore from '../store/CoffeeStore.js'

const AppContext = React.createContext()

// контекст, который будем передавать
const context = {
    coffeeHouse: new CoffeeStore(),    
}

const AppContextProvider = (props) => {
    return (
        <AppContext.Provider value={context}>
            {props.children}
        </AppContext.Provider>
    );
}

export {AppContext, AppContextProvider}