import React, { useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getDetail } from '../redux/actions';
import { useParams } from 'react-router-dom';

const Detail = (props) => {
    const dispatch = useDispatch();
    const {id} = useParams()

    useEffect(() => {
      dispatch(getDetail(id));
    }, [dispatch])

    const myRecipe = useSelector((state) => state.detail);
    console.log(myRecipe[0])

    return (
       <div className="renderContainer">
        {
            myRecipe.length > 0 ?
            <div className='recipeContainer'>
                <h1 className='title'>{!myRecipe[0].createdInDb? myRecipe[0].name : myRecipe[0].title}</h1>
                <img className='image' src={myRecipe[0].img} alt="" />
                <div className='dishType'>
                    <h3>Dish Type: </h3>
                    <p>{!myRecipe[0].createdInDb? myRecipe[0].dishType.map(e => e) : myRecipe[0].dishType}</p>
                </div>
                <div className='diets'>
                    <h3>Diet Type: </h3>
                    <p>{!myRecipe[0].createdInDb? myRecipe[0].dietType.map(e => e):myRecipe[0].diets.map(e => e.name) }</p>
                </div>
                <div className='healthScore'>
                    <h3>Health Score: </h3>
                    <p>{myRecipe[0].healthScore}</p>
                </div>
                <div className='summary'>
                    <h3>Summary: </h3>
                    <p>{myRecipe[0].summary.replace(/<[^>]*>?/g,'')}</p>
                </div>
                <div className='stepByStep'>
                    <h3>Step by step: </h3>
                    <p>{!myRecipe[0].createdInDb? myRecipe[0].stepByStep.map(e => e.steps.map(f => f.step)) : myRecipe[0].stepByStep}</p>
                </div>
                
                
                
                
                
            </div> : <p>Loading...</p>
        }
       </div>
    )
}

export default Detail;