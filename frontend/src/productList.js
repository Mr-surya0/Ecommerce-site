// ProductList.js
import React from 'react';
import './productList.css';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function ProductList({ products, addToCart }) {
  if (!products || products.length === 0) {
    return <div>No products found</div>;  // Show a message if no products are available
  }

  return (
    <div className="product-list">
      <div className="grid-container">
        {products.map((product) => (
          <Card sx={{ maxWidth: 345, minHeight: 445 }} key={product.product_id}>
            <CardMedia
              component="img"
              alt={product.name}
              height="290"
              image={product.image_url}  
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {product.name} 
              </Typography>
              <Typography variant="h6" sx={{ color: 'text.secondary' }} >
                Price: ${product.price}  
              </Typography>
              <Typography gutterBottom variant="h8" component="div" sx={{ marginTop: 0.5, position: 'absolute' }}>
                FREE Delivery by ShopEase  
              </Typography>
            </CardContent>
            <CardActions sx={{ marginTop: 1, display: 'flex', justifyContent: 'space-between' }}>
              <Button size="small" sx={{ fontSize: 12 }} variant='contained'>BUY NOW</Button>
              <Button size="small" sx={{ fontSize: 12 }} variant="contained" onClick={() => addToCart(product)}>
                ADD TO CART
              </Button>
            </CardActions>
          </Card>
        ))}
      </div>
    </div>
  );
}
