/** @jsx jsx */
import { jsx } from "@emotion/core";
import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import EmployeeStore from './EmployeeStore';
import Loader from 'react-loader-spinner';

type EmployeeResultsProp = {
    store: EmployeeStore;
}

const EmployeeResults = observer(( props: EmployeeResultsProp ) => {
    
    console.log("THIS IS THE STORE EMPLOYEEARR..." + props.store.employeeArr)
    if(Object.keys(props.store.employeeArr).length !== 0 && props.store.init == false){
        return (
            <div css={{flexDirection:'row'}}>
                <div css={{flexDirection: 'row'}}>
                    These are the subordinates of employee {props.store.employeeName}: 
                </div>
                <div css={{flexDirection: 'row'}}>
                    <ul css={{
                        backgroundColor: "#fff",
                        boxShadow: "0 4px 10px 0 rgba(0,0,0,0.1)"    
                    }}>
                    {props.store.employeeArr
                        .map((key, index) => {
                            return(
                                <li 
                                css={{
                                    alignItems: "center",
                                    padding: "13px 0 13px 12px",
                                    "&:hover": {
                                        backgroundColor: "#e5f4fd"
                                    }
                                }}
                                key={index}
                                onClick={() => {
                                    props.store.clear()
                                    props.store.setEmployeeName(key.toString())
                                    props.store.findEmployees(key.toString())
                                }}
                                >
                                    {key}
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
            
        )
    }
    else if(Object.keys(props.store.employeeArr).length === 0 && props.store.init == false){
        return(
            <div>
                This person has no subordinates
            </div>
        )
    }
    else{
        return(
            <div>
                Search for a name to begin!
            </div>
        )
    }
    
    
})

export default EmployeeResults;