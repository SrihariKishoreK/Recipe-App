import { useState } from "react";
import axios from 'axios';
import {useGetUserID} from '../hooks/useGetUserID';
import { useNavigate } from "react-router-dom";

export const CreateRecipe = ()=>{
    const userID=useGetUserID();
    console.log(userID);
    const [recipe,setRecipe]=useState({
        name: "",
        ingredients:[],
        instructions:"",
        imageUrl:"",
        cookingTime:0,
        userOwner:userID,
    });

    const navigate = useNavigate();
    const handleChange = (event)=>{
        const {name,value}=event.target;
        console.log(value);
        setRecipe({...recipe, [name] : value})
    }
    const handleIngredientChange = (event,idx)=>{
        const {value}=event.target;
        const ingredients = [...recipe.ingredients];
        ingredients[idx]=value;
        setRecipe({...recipe, ingredients})
    }
    const addIngredient = ()=>{
        setRecipe({...recipe,ingredients: [...recipe.ingredients, ""]});
    }

    const onSubmit = async (event)=>{
        event.preventDefault();
        try {
            console.log(recipe);
            await axios.post("http://localhost:3001/recipes",recipe);
            alert("Recipe created!");
            navigate("/home");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="create-recipe">
            <h2>Create a recipe!</h2>
            <form onSubmit={onSubmit}>
                <label htmlFor="name" >Name</label>
                <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    onChange={handleChange} 
                />
                <label htmlFor="ingredients" >Ingredients</label>
                {recipe.ingredients.map( (ingredient,idx)=>(
                    <input key={idx} type="text" name="ingredients" value={ingredient}
                    onChange={ (event)=>handleIngredientChange(event,idx) }
                    />
                ) )}
                <button onClick={addIngredient} type="button">+</button>
                <label htmlFor="instructions" >Instructions</label>
                <textarea 
                type="text" 
                    id="instructions" 
                    name="instructions" 
                    onChange={handleChange}
                ></textarea>
                <label htmlFor="imageUrl" >Image URL</label>
                <input 
                    type="text" 
                    id="imageUrl" 
                    name="imageUrl" 
                    onChange={handleChange} 
                />

                <label htmlFor="cookingTime" >Cooking Time (minutes)</label>
                <input 
                    type="text" 
                    id="cookingTime" 
                    name="cookingTime" 
                    onChange={handleChange}
                />
                <button type="submit">Create RecYippee!</button>
            </form>
        </div>
    )
}