import React from 'react';

export default function Products({ products = [] }) {
  return (
    <div className="snap-wrapper">
      <div className="snap-track">
        {products.length && products.map((p) => (
          <div key={p.id} className="snap-slide">
            <div className="image-container">
              <img
                style={{ width: "200px", height: "200px", margin: "auto", display: "block" }}
                src={import.meta.env.VITE_API_BASE_URL + "/static/products" + p.img_url}
                alt={p.name} className="image slide-img" />
            </div>
            <div className="slide-meta">
              <div className="name">{p.name}</div>
              <div className="brand">{p.brand}</div>
              <div className="price">Rs {Number(p.price).toLocaleString()}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}