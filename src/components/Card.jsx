import React, { useEffect, useRef, useState } from 'react'
import { useDispatchCart, useCart } from './ContextReducer';

export default function Card(props) {
  // console.log(props);
  const priceRef = useRef()
  let dispatch = useDispatchCart()
  let foodItem = props.foodItem;
  let data = useCart()
  const [size, setSize] = useState("")
  const [qty, setQty] = useState(1)
  let options = props.options;
  let priceOptions = Object.keys(options);
  const handleaddtocart = async () => {
    let food = []
    for (const item of data) {
      if (item.id === foodItem._id) {
        food = item;

        break;
      }
    }
    console.log(food)
    console.log(new Date())
    if (food.length !== 0) {
      if (food.size === size) {
        await dispatch({ type: "UPDATE", id: foodItem._id, price: finalPrice, qty: qty })
        return
      }
      else if (food.size !== size) {
        await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size,img: props.ImgSrc })
        console.log("Size different so simply ADD one more to the list")
        return
      }
      return
    }

    await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size })


    // setBtnEnable(true)

  }
  let finalPrice = qty * parseInt(options[size]);
  useEffect(() => {
  setSize(priceRef.current.value)
  }, [])
  return (
    <div>
        <div className="card mt-3" style={{"width": "18rem", "maxHeight":"360px"}}>
  <img className="card-img-top" style = {{width:"285px", height:"200px"}}src={props.foodItem.img} alt="Card image cap" />
  <div className="card-body">
    <h5 className="card-title">{props.foodItem.name}</h5>
    <div className='container'>
      <select className='m-2 bg-success rounded' onChange={(e) => {setQty(e.target.value)}}>
        {
          Array.from(Array(6), (e,i) => {
            return (
              <option key = {i+1} value={i+1} >{i+1}</option>
            )
          })
        }
      </select>

      <select className='m-2 bg-success rounded' ref={priceRef} onChange={(e) => {setSize(e.target.value)}}>
        {  priceOptions.map((option) => {
          return (
            <option key={option}value={option} >{option}</option>
          )

        })
        
       }
      </select>
    </div>
    <div className='d-inline'>
      Rs:{finalPrice} $/-
    </div>
    <button  className="btn btn-primary" onClick={handleaddtocart}>Add to cart</button>
  </div>
   
       </div>
    </div>
  )
}
