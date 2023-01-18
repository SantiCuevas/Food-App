import React from "react";
import styles from "./Recipe.module.css";

export default function Recipe({ name, img, dietType, id}) {
    return(
        <div className={styles.card}>
            <h4>{name}</h4>
            <img className={styles.img} src={img} alt="Not found" width="200px" height="250px"/>
            <h6>{dietType}</h6>
        </div>
    )
}