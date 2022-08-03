import React, { useEffect, useState } from 'react';
import styles from './Menu.module.css';
import { MenuItem } from './MenuItem';
import { useHttp } from '../../Hooks/useHttp';

export function Menu(){
    const [meals, setMeals] = useState([]);
    const { isloading, error, sendRequest: fetchMenuItems } = useHttp();

    useEffect(() => {
        const transformData = (responseData) => {
            const loadedMeals = [];
            for (const key in responseData){
                loadedMeals.push({
                    id: key,
                    name: responseData[key].name,
                    price: responseData[key].price,
                    description: responseData[key].description
                });
            }
            setMeals(loadedMeals);
        }
        fetchMenuItems({ url:'https://react-http-7b0c4-default-rtdb.firebaseio.com/meals.json' }, transformData);

    }, [fetchMenuItems]);


    return(
        <>
            {isloading && <div id={styles['menu-card']}><p>Loading...</p></div>}
            {error && <div id={styles['menu-card']}><p>Error loading Data</p></div>}
            {!isloading && !error &&
                <div id={styles['menu-card']}>
                    {meals.map((data) => <MenuItem key={data.id} data={data}/>)}
                </div>
            }
        </>
    );
}
