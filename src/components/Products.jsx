import React from 'react';

export default function Products({ products }) {
  if (!products?.length) return null;

  return (
    <div className="products">
      {products.map((p) => (
        <div className="product-card">
          <div className="image-container">
            <img style={{ width: "200px", height: "200px", margin: "auto", display: "block" }} src={import.meta.env.VITE_API_BASE_URL + "/static/products/" + p.img_url} alt={p.name} className="image" />
          </div>
          <div style={{ fontWeight: "bold", textAlign: "center" }} className="name">{p.name}</div>
          <div style={{ color: "gray", textAlign: "center" }} className="brand">{p.brand}</div>
          <div style={{ color: "green", textAlign: "center" }} className="price">{p.price}</div>
          <div style={{ fontStyle: "italic", textAlign: "center" }} className="desc">{p.description}</div>
        </div>
      ))}
    </div>
  );
}