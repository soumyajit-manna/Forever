import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import ProductItem from './ProductItem';

const RelatedProducts = ({category,subCategory}) => {

    const { products } = useContext(ShopContext);
    const [related,setRelated] = useState([]);

    useEffect(()=>{

        if (products.length > 0) {
            
            let productsCopy = products.slice();
            
            productsCopy = productsCopy.filter((item) => category === item.category);
            productsCopy = productsCopy.filter((item) => subCategory === item.subCategory);

            setRelated(productsCopy.slice(0,5));
        }
        
    },[products])

  return (
    <section className="related-products">
      <div className="related-products-heading">
        <div>
          <p>YOU MAY ALSO LIKE</p>
          <h2>
            More to <em>explore.</em>
          </h2>
        </div>
        <span>RELATED PRODUCTS / FOREVER</span>
      </div>

      <div className="related-product-grid">
        {related.map((item,index)=>(
            <ProductItem key={index} id={item._id} name={item.name} price={item.price} image={item.image}/>
        ))}
      </div>
    </section>
  )
}

export default RelatedProducts
