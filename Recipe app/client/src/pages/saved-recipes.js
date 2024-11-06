// export const SavedRecipes = ()=>{
//     return (
//         <div>SavedRecipes</div>
//     )
// }
import { useState , useEffect } from "react";
import axios from "axios";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import {useGetUserID} from '../hooks/useGetUserID';

export const SavedRecipes = ()=>{

    const [savedRecipes ,setSavedRecipes ]=useState([]);
    const userID=useGetUserID();
    useEffect( ()=>{
        
        const fetchSavedRecipe =  async ()=>{
            try {
                // console.log(userID);
                const response = await axios.get(
                    `http://localhost:3001/recipes/savedRecipes/${userID}`
                     );
                setSavedRecipes(response.data.savedRecipes); 
            } catch (error) {
                console.log(error);
            }
        }

        fetchSavedRecipe();
    },[]);

    return (
        <div>
            <h1 className="heading" >Saved Recipes</h1> 
            <ul>
                {savedRecipes.map( (recipe)=>(
                     <li key={recipe._id}>
                        <div>
                            <h2>Dish : {recipe.name}</h2>
                            {savedRecipes.includes(recipe._id) && <h4>Already Saved!</h4> }
                            <img src={recipe.imageUrl} alt={recipe.namen} />
                        </div>
                        <div className="instructions">
                            <h2>Instructions:</h2> 
                            <h3>{recipe.instructions }</h3>
                        </div>
                        <div className="ingredients">
                            <h2>Ingredients</h2>
                            <ul>
                                {recipe.ingredients.map( (item)=>(
                                    <li key={item}><h3>{item}</h3></li>
                                ))}
                            </ul>
                        </div>
                        <h2>Cooking Time : {recipe.cookingTime} (minutes) </h2>
                     </li>
                ) )}
            </ul>
        </div>
    )
} 