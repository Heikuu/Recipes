import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";

const API_KEY = "3f70938c67c84dcea58a1cf55581bee0";


function Searched() {

    const [searchedRecipies, setSearchedRecipies] = useState([]);
    const params = useParams();

    useEffect(()=>{
        getSearched(params.search)
    },[params.search]);

    const getSearched = async(name) => {
        const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&query=${name}`);
        const recipes = await data.json();

        setSearchedRecipies(recipes.results);
    
    }

  return (
    <Grid>
        {searchedRecipies.map((item) => {
            return(
                <Card key={item.id}>
                    <Link to={'/recipe/' + item.id}>
                        <h4>{item.title}</h4>
                        <img src={item.image} alt="" />
                    </Link>
                </Card>
            )
        })}
    </Grid>
  )
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

export default Searched