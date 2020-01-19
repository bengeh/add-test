import React from "react";
import EmployeeStore, { createStore } from "./EmployeeStore";
import { useLocalStore } from "mobx-react-lite";

export const storeContext = React.createContext<EmployeeStore | null>(null);

export const StoreProvider = (props: { children: React.ReactNode }) => {
    const store = useLocalStore(createStore)

    return (
        <storeContext.Provider value={store}>
            {props.children}
        </storeContext.Provider>
    );
};

export default StoreProvider;

export const useStore = () => {
    const store = React.useContext(storeContext);
    if (!store) {
        throw new Error("useStore must be used within a storeProvider");
    }
    return store;
}