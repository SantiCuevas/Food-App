import React from 'react';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllRecipes, filterByDiet, orderByHs, alfaOrder } from '../redux/actions';
import Paginado from './Paginado';
import Recipe from './Recipe';
import styles from './Home.module.css';
import urlDefaultImg from '../icons/logo2.png';

const Home = () => {

    const dispatch = useDispatch();
    const recipes = useSelector(state => state.recipesLoaded)
    // console.log('soy las recipes', recipes )
    const [order1, setOrder1] = useState('');
    const [order2, setOrder2] = useState('');
    const [currentPage,setCurrentPage] = useState(1);
    const [recipesPerPage,setRecipesPerPage] = useState(9);
    const indexLast = currentPage * recipesPerPage; // indice de la ultima card: 6
    const indexFirst = indexLast - recipesPerPage; // indice de la primera card: 0
    const currentRecipes = recipes.slice(indexFirst, indexLast); // dividimos asi las cards por pag.
    // console.log('soy las currentRecipes',currentRecipes)

    const paginado= (pageNumbers) => {
        setCurrentPage(pageNumbers)
    } 

    useEffect(() => {
      dispatch(getAllRecipes())
    }, [dispatch])

    function handleOnClick(e) {
        e.preventDefault();
        dispatch(getAllRecipes());
    }

    function handleFilterDiet(e) {
        dispatch(filterByDiet(e.target.value));
    }

    function handleOrderName(e) {
        e.preventDefault();
        dispatch(alfaOrder(e.target.value));
        setCurrentPage(1);
        setOrder1(`ordenado ${e.target.value}`)
    }

    function handleOrderHs(e) {
        e.preventDefault();
        dispatch(orderByHs(e.target.value));
        setCurrentPage(1);
        setOrder2(`ordenado ${e.target.value}`)
    }

    return (
        <div className={styles.container}>
            <div className={styles.select}>
                <select className={styles.filtA} onChange={e => handleOrderName(e)}>
                    <option value="az">(A-Z)</option>
                    <option value="za">(Z-A)</option>
                </select>
                <select className={styles.filtB} onChange={e => handleOrderHs(e)}>
                    <option value="highest">Highest health score</option>
                    <option value="lowest">Lowest health score</option>
                </select>
                <select className={styles.filtC} onChange={e => handleFilterDiet(e)} >
                    <option value="all">All</option>
                    <option value="gluten free">Gluten free</option>
                    <option value="ketogenic">Ketogenic</option>
                    <option value="vegetarian">Vegetarian</option>
                    <option value="lacto-vegetarian">Lacto-vegetarian</option>
                    <option value="ovo-vegetarian">Ovo-vegetarian</option>
                    <option value="vegan">Vegan</option>
                    <option value="pescetarian">Pescetarian</option>
                    <option value="paleo">Paleo</option>
                    <option value="primal">Primal</option>
                    <option value="low fodmap">Low fodmap</option>
                    <option value="whole 30">Whole 30</option>
                </select>
                <button className={styles.btn} onClick={e => handleOnClick(e)}>Eliminar filtros</button>
            </div>
            <div className={styles.cards}>
            {
                currentRecipes.length > 0 ? currentRecipes.map(el => {
                    return (
                    <Link className={styles.a} to={"/home/" + el.id}>
                    <Recipe name={el.name? el.name : el.title } img={!el.createdInDb? el.img : urlDefaultImg} 
                    dietType={el.dietType? el.dietType : el.diets.map(e => e.name)} 
                    key={el.id}/> 
                    </Link>
                )
                }) : <p>Loading...</p> 
            }
            </div>
            <Paginado recipesPerPage={recipesPerPage} recipes={recipes.length} paginado={paginado}/>
        </div>
    )
}

export default Home;