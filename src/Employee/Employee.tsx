/** @jsx jsx */
import { jsx } from "@emotion/core";
import React, { useState } from "react";
import StoreProvider from "./StoreProvider";
import { observer } from "mobx-react-lite";
import SearchButton from '../components/SearchButton';
import { useStore } from "../Employee/StoreProvider";
import EmployeeResults from './EmployeeResults';

const Employee = observer(() => {
    const store = useStore();
    const [currEmployee, setCurrEmployee] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    var value = e.target.value;
    console.log("value being change to... " + value);
    setCurrEmployee(value);
    store.setEmployeeName(value)
  }

    return (
        <div className="App">
            <div css={{
                display: 'flex',
                width: '300px',
                height: '200px',
                top: '50%',
                left: '50%',
                position: 'absolute',
                margin: '-100px 0 0 -150px'
                }}>
                <div css={{
                flexDirection:'row'
                }}>
                <div>Employee Explorer</div>
                <div>
                    <input css={{
                    border: '1px solid black'
                    }}placeholder="Search for an employee" 
                    onChange={handleChange} 
                    value={store.employeeName}>
                    </input>
                    <SearchButton employeeName={store.employeeName}/>
                </div>
                <EmployeeResults store={store}/>
                </div>
            </div>
        </div>
    );
});

const Wrapper = () => (
    <StoreProvider>
        <Employee />
    </StoreProvider>
);

export default Wrapper;