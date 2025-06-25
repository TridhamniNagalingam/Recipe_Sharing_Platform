import React,{useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

export default function Edit(){
    const [recipeData,setRecipeData]=useState({})
    const navigate=useNavigate()
    const {id}=useParams()

    useEffect(()=>{
        const getData=async()=>{
            await axios.get(`http://localhost:3000/recipe/${id}`)
            .then(response=>{
                let res=response.data;
                setRecipeData({
                    title:res.title,
                    ingredients: Array.isArray(res.ingredients) ? res.ingredients.join(", ") : "",
                    steps:res.steps,
                    time:res.time
                })
            })
        }
        getData()
    },[])

    const onHandleChange=(e)=>{
        let val=(e.target.name==="ingredients") ? e.target.value.split(","):(e.target.name==="file")?e.target.files[0]:e.target.value
        setRecipeData(pre=>({...pre,[e.target.name]:val}))
    }

    const onHandleSubmit=async(e)=>{
        e.preventDefault()
        console.log(recipeData)
        await axios.patch(`http://localhost:3000/recipe/${id}`,recipeData,{
            headers:{
                'Content-Type':'multipart/form-data',
                'authorization':'bearer '+localStorage.getItem("token")
            }
        })
        .then(()=>navigate("/myRecipe"))
    }

    return(
        <>
        <div className='container'>
            <form className='form' onSubmit={onHandleSubmit}>
                <div className='form-control'>
                    <label>Title</label>
                    <input type="text" className='input' name='title' onChange={onHandleChange} value={recipeData.title} />
                </div>
                <div className='form-control'>
                    <label>Ingredients</label>
                    <textarea name="ingredients" type="text" className='input-textarea' rows='5' onChange={onHandleChange} value={recipeData.ingredients}></textarea>
                </div>
                <div className='form-control'>
                    <label>Steps</label>
                    <textarea name="steps" type="text" className='input-textarea' rows='5' onChange={onHandleChange} value={recipeData.steps}></textarea>
                </div>
                <div className='form-control'>
                    <label>Preparation Time</label>
                    <input type="text" className='input' name='time' onChange={onHandleChange} value={recipeData.time}/>
                </div>
                <div className='form-control'>
                    <label>Recipe Image</label>
                    <input type="file" className='input' name='file' onChange={onHandleChange}/>
                </div>
                <button type="submit">Edit Recipe</button>
            </form>
        </div>
        </>
    )
}