import React, {useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
const ProductList = ()=>{
    const [products, setProducts] = useState([]);

    useEffect(()=>{
        getProducts();
    },[])
    const getProducts = async ()=>{
        let result = await fetch('http://localhost:5100/products');
        result = await result.json();
        setProducts(result);
    }
    
    const deleteProduct = async (id) => {
        let result = await fetch(`http://localhost:5100/product/${id}`, {
          method: "DELETE"
        });
        result = await result.json();
        if (result) {
          alert("record is deleted")
          getProducts();

        }
      };

    const searchHandle = async (event)=>{
        console.warn(event.target.value);
        let key = event.target.value;
        if(key){
            let result = await fetch(`http://localhost:5100/search/${key}`)
            result = await result.json();
            if(result){
                setProducts(result)
            }
        }
        else{
            getProducts();
        }
       
    }

    return (
        <div className="product-list">
            <h1>Product List</h1>
            <input className="search-product-box" type="serach" placeholder='Search Product'
             onChange={searchHandle} />
            <ul>
                <li>S. No.</li>
                <li>Name</li>
                <li> Price</li>
                <li> Category</li>
                <li> Operation</li>
            </ul>
            {
                products.length>0 ? products.map((item,index)=>
                    <ul key={item}>
                        <li>{index+1}</li>
                        <li>{item.name}</li>
                        <li>${item.price}</li>
                        <li>{item.category}</li>
                        <li><button onClick={()=>deleteProduct(item._id)} >Delete</button>
                        <Link to={`/update/${item._id}`}> Update</Link>
                        </li>
                    </ul>
                )
                :<h1>No Product Found</h1>
            }
            
        </div>
    );
}

export default ProductList;