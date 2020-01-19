import React, { useState, useEffect } from 'react';
import { useStore } from "../Employee/StoreProvider";

type SearchButtonType = {
    employeeName: string;
}

const SearchButton = (props: SearchButtonType) => {
    const store = useStore();

    const searchEmployee = () => {
        store.findEmployees(props.employeeName)
      }
    return (
        <button onClick={searchEmployee}>SEARCH</button>
    )
}


export default SearchButton;
