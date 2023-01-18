import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getByName } from "../redux/actions";

const SearchBar = () => {
    const dispatch = useDispatch();
    const [name, setName] = useState('');

    function handleOnChange(e) {
        e.preventDefault();
        setName(e.target.value);
    }

    function handleOnClick(e) {
        e.preventDefault();
        dispatch(getByName(name));
        // setName('');
    }

    return (
        <div>
            <input type="text" placeholder="Search..." onChange={e => handleOnChange(e)}/>
            <button type="submit" onClick={e => handleOnClick(e)}>Search</button>
        </div>
    )
}

export default SearchBar;