import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

const API_KEY = "3f70938c67c84dcea58a1cf55581bee0";

function Cuisine() {
    const [cuisines, setCuisines] = useState([]);
    let params = useParams();

    useEffect(()=> {
        getCuisine(params.type);

        console.log(params.type)
        
    },[params.type ]);

    const getCuisine = async(name) => {
        const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&cuisine=${name}`);
        const recipes = await data.json();

        setCuisines(recipes.results);
    
    }

  return <Grid>
        {cuisines.map((item)=> {
            return(
                <Card key={item.id}>
                    <Link to={'/recipe/' + item.id}>
                        <h4>{item.title}</h4>
                        <img src={item.image} alt="cuisine image" />
                    </Link>
                </Card>
            )
        })}
    </Grid>
}

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
    grid-gap: 3rem;
`;

const Card = styled.div`
    img {
        width: 100%;
        border-radius: 2rem;
    }
    a {
        text-decoration: none;
    }
    h4 {
        text-align: center;
        padding: 1rem;
    }
`;

export default Cuisine