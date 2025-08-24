// Products.jsx
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Navigation, Pagination } from "swiper/modules";

export default function Products({ products = [] }) {
  if (!products.length) return null;

  return (
    <div className="products-carousel">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {products.map((p) => (
          <SwiperSlide key={p.id}>
            <div className="product-card">
              <div className="image-container">
                <img
                  className="slide-img"
                  src={`${import.meta.env.VITE_API_BASE_URL}/static/products/${p.img_url}`}
                  alt={p.name}
                  loading="lazy"
                />
              </div>
              <div className="slide-meta">
                <h3 className="name">{p.name}</h3>
                <div className="brand">{p.brand}</div>
                <div className="price">Rs {Number(p.price).toLocaleString()}</div>
                {p.description && <p className="desc">{p.description}</p>}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
