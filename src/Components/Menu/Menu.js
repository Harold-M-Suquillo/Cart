import data from '../../Other/Data';
import React from 'react';
import styles from './Menu.module.css';
import { MenuItem } from './MenuItem';

export function Menu(){
    return(
        <div id={styles['menu-card']}>
            {data.map((info, index) => <MenuItem key={`menu_item${index}`}data={info}/>)}
        </div>
    );
}
