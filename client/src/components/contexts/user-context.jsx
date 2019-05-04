import { createContext } from 'react';

const defaultUserState = {
    isLogged: false,
    updateUser() { }
}

const { Consumer: UserConsumer, Provider: UserProvider } = createContext(defaultUserState);

export {
    UserProvider,
    UserConsumer,
    defaultUserState
}