import React from 'react';
import ReactDOM from 'react-dom';
import { Navbar } from './Navbar';
import backgroudImage from '../../Assests/background-image.jpeg';
import styles from './Header.module.css'

export function Header(){
    return (
        <>
            {ReactDOM.createPortal(<Navbar/>, document.getElementById("navbar-root"))}
            <div id={styles['img-container']}>
                <img id={styles['background-img']} src={backgroudImage} alt="food platter"/>
            </div>
            <section id={styles['info-container']}>
                <h2>Delicious Food, Delivered To You</h2>
                <p>
                    Choose your favorite meal from our broad selection of available meals and enjoy a delicious lunch or dinner at home.
                </p>
                <p>
                    All our meals are cooked with high-quality ingredients, just-in-time and of course by experienced chefs!
                </p>
            </section>
        </>
    );
};