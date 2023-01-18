import React from "react";
import styles from './Paginado.module.css';

export default function Paginado ({recipesPerPage, recipes, paginado}) {
    const pageNumbers = [];

    for(let i = 0; i < Math.ceil(recipes/recipesPerPage); i++) {
        pageNumbers.push(i+1);
    }

    return (
        <nav >
            <ul className={styles.paginado}>
                {
                    pageNumbers?.map(number => (
                        <li key={number} className={styles.li}>
                            <a onClick={() => paginado(number)}>{number}</a>
                        </li>
                    ))
                }
                
            </ul>
        </nav>
    )
}