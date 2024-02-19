import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function MyProduct() {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: ''
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api', formData);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api', formData);
      setFormData({ name: '', price: '', description: '' });
      fetchProducts(); // Refresh the product list
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleDelete = async (productId) => {
    try {
      await axios.delete("http://localhost:5000/", productId);
      fetchProducts(); // Refresh the product list
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleUpdate = async (productId) => {
    
    try {
        await axios.patch(`http://localhost:5000/${selectedProductId}`, formData);
        fetchProducts(); // Refresh the product list
        setSelectedProductId(null); // Reset selected product
      } catch (error) {
        console.error('Error updating product:', error);
      }
    };
    // console.log('Update product:', productId);
//   };

  return (
    <div>
    <center>
      <h1>Products</h1>
      <form className='p-3' onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} />
        <label>Price:</label>
        <input type="number" name="price" value={formData.price} onChange={handleChange} />
        <label>Description:</label>
        <input type="text" name="description" value={formData.description} onChange={handleChange} />
        <button type="submit button" className="btn btn-success ">Add Product</button>
        {/* <button type="submit button" class="btn btn-danger">Delete Product</button> */}
      </form>
      <ul>
        {products.map(product => (
          <li key={product._id}>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <button type="submit button" className="btn btn-primary " onClick={()=>{handleUpdate(product._id)}}> Update Product</button>
            <button type="submit button" className="btn btn-danger " onClick={()=>{handleDelete(product._id)}} >Delete Product</button>
            <button type="submit button" className="btn btn-info" onClick={()=>{console.log("buy",product.name)}}>Buy</button>
          </li>
        ))}
      </ul>
      </center>
    </div>
  );
}

export default MyProduct;
