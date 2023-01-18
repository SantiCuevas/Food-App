import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';
import img from '../icons/logo2.png';
import SearchBar from './SearchBar';

const Navbar = () => {
    return (
        <div className={styles.container}>
            <div className={styles.img}>
                <img src={img} alt="problemita" />
            </div>
            <div className={styles.routes}>
                <NavLink className={styles.link} activeClassName={styles.active} to='/home'>Home</NavLink>
                <NavLink className={styles.link} activeClassName={styles.active} to='/form'>Form</NavLink>
            </div>
            <div className={styles.searchBar}>
                <SearchBar/>
            </div>
        </div>
    )
}

export default Navbar;