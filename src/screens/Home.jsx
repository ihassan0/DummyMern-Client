import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'
import heroImage from '../assets/images/hero-image.jpg'
import heroImage2 from '../assets/images/hero-image2.jpg'
import axios from 'axios'


export default function Home() {
 const [foods, setFood] = useState([])
 const [cats, setCat] = useState([])
 const [search, setSearchValue] = useState("")
 useEffect(()=> {
  axios.post(`https://dummy-mern-server.vercel.app/foods`)
  .then(result => {
    setFood(result.data.foodItems);
     setCat(result.data.foodCategories);
    })

 })


  return (
    <div>
        <div><Navbar/></div>
        <div>
        <div id="carouselExampleFade" className="carousel slide" data-ride="carousel" style={{objectFit:"contain !important"}}>
  <div className="carousel-inner" id='carousel' style={{maxHeight:"500px"}}>
    <div className="carousel-caption" style={{zIndex:10}}>
    <div className="d-flex">
    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" value={search}
    onChange={(e) => {
      setSearchValue(e.target.value)
    }}/>
  </div>
  </div>
    <div className="carousel-item active">
      <img className="d-block w-100" src={heroImage} alt="First slide" />
    </div>
    <div className="carousel-item">
      <img className="d-block w-100" src={heroImage2} alt="Second slide" />
    </div>
  </div>
  
  <a className="carousel-control-prev" href="#carouselExampleFade" role="button" data-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="sr-only">Previous</span>
  </a>
  <a className="carousel-control-next" href="#carouselExampleFade" role="button" data-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="sr-only">Next</span>
  </a>
</div>
        </div>
        <div className='container'>
          {
            cats.map((cat) => {
              return (
                <div className='mb-3 row'>
                <div key={cat._id} className='fs-3 m-3'>{cat.CategoryName}</div>
                <hr />
                {
                  foods.filter((item) => (item.CategoryName == cat.CategoryName) && 
                  (item.name.toLowerCase().includes(search.toLowerCase()))
                ).map((food) => {
                    return (
                      <div key={food._id} className='col-12 col-md-6 col-lg-4'>
                        <Card
                        foodItem = {food}
                        options = {food.options[0]}
                        >
                        </Card>
                        </div>
                    )
                  })
                }
                
                </div>
              )
            })
          }
        </div>
        <div><Footer/></div>
    </div>
  )
}
