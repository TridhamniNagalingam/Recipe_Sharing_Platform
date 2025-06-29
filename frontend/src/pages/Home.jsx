import React, { useState } from 'react'
import foodphoto from '../assets/foodcover.jpg'
import Items from '../components/Items'
import { useNavigate } from 'react-router-dom'
import LoginModal from '../components/LoginModal'
import InputForm from '../components/InputForm'

export default function Home() {
    const navigate=useNavigate()
    const [isOpen,setIsOpen]=useState(false)
    const addRecipe=()=>{
        let token=localStorage.getItem("token")
        if(token){
            navigate("/addRecipe")
        }
        else{
            setIsOpen(true)
        }
    }

    return (
        <>
            <section className='home'>
                <div className='left'>
                    <h1>Foodly Satisfying</h1>
                    <h5>Food is a beautiful blend of art and science, where ingredients, flavors, and techniques come together to create something delicious. Each dish tells a story, reflecting culture, creativity, and care in every bite.</h5>
                    <button onClick={addRecipe}>Share your recipe</button>
                </div>
                <div className='right'>
                    <img src={foodphoto} width="320px" height="300px" alt='food picture'></img>
                </div>
            </section>
            <div className='bg'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#d4f6e8" fillOpacity="1" d="M0,32L40,32C80,32,160,32,240,58.7C320,85,400,139,480,149.3C560,160,640,128,720,101.3C800,75,880,53,960,80C1040,107,1120,181,1200,213.3C1280,245,1360,235,1400,229.3L1440,224L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"></path></svg>
            </div>
            {(isOpen) && <LoginModal onClose={()=>setIsOpen(false)}><InputForm setIsOpen={()=>setIsOpen(false)}/></LoginModal>}
            <div className='recipe'>
                <Items/>
            </div>
        </>
    )
}