// Products.jsx
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useTheme } from "../contexts/ThemeContext";

import { Navigation, Pagination } from "swiper/modules";

export default function Products({ products = [] }) {
  const { theme } = useTheme();
  
  if (!products.length) return null;

  return (
    <div className="products-carousel" style={{ margin: '16px', padding: '16px' }}>
      <h2 style={{ color: theme.colors.text, marginBottom: '20px', textAlign: 'center' }}>
        Products Found
      </h2>
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
        style={{
          '--swiper-navigation-color': theme.colors.primary,
          '--swiper-pagination-color': theme.colors.primary,
        }}
      >
        {products.map((p) => (
          <SwiperSlide key={p.id}>
            <div className="product-card themed-card">
              <div className="image-container" style={{ marginBottom: '12px' }}>
                <img
                  className="slide-img"
                  src={`${import.meta.env.VITE_API_BASE_URL}/static/products/${p.img_url}`}
                  alt={p.name}
                  loading="lazy"
                  style={{ 
                    width: '100%', 
                    height: '200px', 
                    objectFit: 'cover', 
                    borderRadius: '6px',
                    border: `1px solid ${theme.colors.border}`
                  }}
                />
              </div>
              <div className="slide-meta">
                <h3 className="name" style={{ 
                  color: theme.colors.text, 
                  margin: '0 0 8px 0', 
                  fontSize: '18px',
                  fontWeight: '600'
                }}>
                  {p.name}
                </h3>
                <div className="brand" style={{ 
                  color: theme.colors.textSecondary, 
                  fontSize: '14px',
                  marginBottom: '4px'
                }}>
                  {p.brand}
                </div>
                <div className="price" style={{ 
                  color: theme.colors.primary, 
                  fontSize: '20px',
                  fontWeight: 'bold',
                  marginBottom: '8px'
                }}>
                  Rs {Number(p.price).toLocaleString()}
                </div>
                {p.description && (
                  <p className="desc" style={{ 
                    color: theme.colors.textMuted, 
                    fontSize: '14px',
                    lineHeight: '1.4',
                    margin: 0
                  }}>
                    {p.description}
                  </p>
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
