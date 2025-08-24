import React from "react";
import { useTheme } from "../contexts/ThemeContext";

const WelcomeMessage = ({ isFirstVisit, totalProducts, totalCategories }) => {
  const { theme } = useTheme();
  
  return (
    <div className="welcome-container fade-in">
      {isFirstVisit ? (
        <div>
          <h1 className="welcome-title" style={{ color: theme.colors.text }}>
            👋 <strong>Welcome to our store!</strong>
          </h1>
          <p style={{ color: theme.colors.textSecondary, fontSize: '18px', lineHeight: '1.6' }}>
            We offer <strong style={{ color: theme.colors.primary }}>{totalCategories}+</strong> categories, nearly{" "}
            <strong style={{ color: theme.colors.primary }}>{totalProducts + 1}</strong> products, and a variety of{" "}
            <strong style={{ color: theme.colors.primary }}>top brands</strong>.
          </p>
          <p style={{ color: theme.colors.textSecondary, fontSize: '16px' }}>
            Would you like some help getting started? 😊
          </p>
        </div>
      ) : (
        <div>
          <h1 className="welcome-title" style={{ color: theme.colors.text }}>
            👋 <strong>Welcome back!</strong>
          </h1>
          <p style={{ color: theme.colors.textSecondary, fontSize: '16px' }}>
            Let me know if you need help finding something.
          </p>
        </div>
      )}
    </div>
  );
};

export default WelcomeMessage;