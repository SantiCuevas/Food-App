import React, { useState, useEffect} from 'react';
import  {Link, useHistory} from 'react-router-dom';
import {postRecipe, getDiets} from '../redux/actions';
import {useDispatch, useSelector} from 'react-redux';

function validate(input) {
    let errors = {};
    if(!input.title) {
        errors.title = 'Name has to be completed';
    } else if(!input.summary) {
        errors.summary = 'Summary has to be completed';
    }
    return errors;
}

const Form = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    let dietType = useSelector((state) => state.dietsLoaded);
    const [errors, setErrors] = useState({});
    const [input, setInput] = useState({
        title: "",
        img: "",
        dietType: [],
        summary: "",
        healthScore:"",
        stepByStep: [],
    });

    useEffect(() =>{
        dispatch(getDiets());
    },[dispatch]);

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(postRecipe(input));
        alert("Your recipe has been created!");
        setInput({
            title: "",
            img: "",
            dietType: [],
            summary: "",
            healthScore:"",
            stepByStep: [], 
        });
        history.push('/home');
    }

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value,
        }));
        console.log(input);
    }

    function handleSelect(e) {
        setInput({
            ...input,
            dietType: [...input.dietType, e.target.value],
        });
    }

    function handleDelete(el) {
        setInput({
            ...input,
            dietType: input.dietType.filter (diet => diet !== el)
        });
    }

    return (
        <div>
            <h1>Share your recipe with us!</h1>
            <form onSubmit={e => handleSubmit(e)}>
                <div>
                    <label>Name:</label>
                    <input onChange={(e) => {handleChange(e)}} type="text" value={input.name} name="title"/>
                    {errors.title && ( 
                        <p>{errors.title}</p>
                    )}
                </div>
                <div>
                    <label>Image:</label>
                    <input onChange={(e) => {handleChange(e)}} type="text" value={input.img} name="img"/>
                </div>
                <div>
                    <label>Summary:</label>
                    <input onChange={(e) => {handleChange(e)}} type="text" value={input.summary} name="summary"/>
                    {errors.summary && ( 
                        <p>{errors.summary}</p>
                    )}
                </div>
                <div>
                    <label>Health score:</label>
                    <input onChange={(e) => {handleChange(e)}} type="number" value={input.healthScore} name="healthScore"/>
                </div>
                <div>
                    <label>Step by step:</label>
                    <input onChange={(e) => {handleChange(e)}} type="text" value={input.stepByStep} name="stepByStep"/>
                </div>

            <select onChange={(e) => {handleSelect(e)}} >
                
                {dietType.map((d) => {
                 return       <option value={d.name}> {d.name} </option>
                })
                }
            </select>
            <button type='submit'>Create</button>
            </form>
            {input.dietType.map(el => 
                <div>
                   <p>{el}</p>
                   <button onClick={() => handleDelete(el)}>x</button> 
                </div>
            )}


        </div>
    )
}

export default Form;