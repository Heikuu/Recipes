import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const API_KEY = "3f70938c67c84dcea58a1cf55581bee0";

function Recipe() {
    const params = useParams();
    const [details, setDetails] = useState({});
    const [activeTab, setActiveTab] = useState('instructions')

    useEffect(()=> {
       fetchDetail();
    },[params.name]);

    const fetchDetail = async() => {
        const data = await fetch(`https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${API_KEY}`);
        const detailData = await data.json();
        
        setDetails(detailData);
        console.log(detailData);
    }

  return <DetailWrapper>
        <div>
            <h2>{details.title}</h2>
            <img src={details.image} alt="" />
        </div>

        <Info>
            <Button className={activeTab === "instructions" ? "active" : ""} onClick={()=> setActiveTab("instructions")}>Instructions</Button>
            <Button className={activeTab === "ingredients" ? "active" : ""} onClick={()=> setActiveTab("ingredients")}>Ingredients</Button>

            {activeTab === "instructions" && (
                <div>
                    <h3 dangerouslySetInnerHTML={{ __html: details.summary }}></h3>
                    <h3 dangerouslySetInnerHTML={{ __html: details.instructions }}></h3>
                </div>
            )}
            {activeTab === "ingredients" && (
                <ul>
                    {details.extendedIngredients.map((ingredient) => (
                        <li key={ingredient.id}>{ingredient.name}</li>
                    ))}
                </ul>
                // <h3>
                //     hhhh
                // </h3>
            )}

            

            
        </Info>
  </DetailWrapper>
}

const DetailWrapper = styled.div`
    margin-top: 10rem;
    margin-bottom: 5rem;
    display: flex;

    .active {
        background: linear-gradient(35deg, #494949, #313131);
        color: white;
    }

    h2 {
        margin-bottom: 2rem;
    }

    li{
        font-size: 1.2rem;
        line-height: 2.5rem;
    }
    ul{
        margin-top: 2rem;
    }
`;

const Button = styled.div`
    padding: 1rem 2rem;
    color: #313131;
    background: white;
    border: 2px solid black;
    margin-right: 2rem;
    font-weight: 600;
`;

const Info = styled.div`
    margin-left: 10rem;
    
`;

export default Recipe