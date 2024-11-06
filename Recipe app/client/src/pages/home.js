import { useState , useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import {useGetUserID} from '../hooks/useGetUserID';

export const Home = ()=>{

    const [recipes ,setRecipes ]=useState([]);
    const [savedRecipes ,setSavedRecipes ]=useState([]);
    const userID=useGetUserID();
    useEffect( ()=>{
        const fetchRecipe =  async ()=>{
            try {
                const response = await axios.get("http://localhost:3001/recipes");
                setRecipes(response.data);
                console.log(response);
            } catch (error) {
                console.log(error);
            }
        };
        const fetchSavedRecipe =  async ()=>{
            try {
                console.log(userID);
                const response = await axios.get(
                    `http://localhost:3001/recipes/savedRecipes/ids/${userID}`
                     );
                setSavedRecipes(response.data.savedRecipes); 
            } catch (error) {
                console.log(error);
            }
        }

        fetchRecipe();
        fetchSavedRecipe();
    },[]);

    const saveRecipe = async (recipeID)=>{
        try {
            const response = await axios.put ("http://localhost:3001/recipes",{
                recipeID,
                userID
            });
            setRecipes(response.data.savedRecipes);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    const isRecipeSaved = (id)=> savedRecipes.includes(id)

    return (
        <div>
            <h1 className="heading" >Recipes</h1> 
            <ul>
                {recipes.map( (recipe)=>(
                     <li key={recipe._id}>
                        <div>
                            <h2>Dish : {recipe.name}</h2>
                            {savedRecipes.includes(recipe._id) && <h4>Already Saved!</h4> }
                            <button
                              onClick={() => saveRecipe(recipe._id)}
                              disabled={isRecipeSaved(recipe._id)}
                            >
                              <FontAwesomeIcon icon={faBookmark} />
                            </button>
                            {/* {savedRecipes.includes(recipe._id) ? (
                                  <h4>Already Saved!</h4>
                                ) : (
                                    <button 
                                    onClick={ ()=> saveRecipe(recipe._id) }><FontAwesomeIcon icon={faBookmark} 
                                    disabled={isRecipeSaved(recipe._id)}    
                                    />
                                    </button>
                                )} */}
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