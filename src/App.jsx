import React, { useEffect, useState } from "react";
import WelcomeMessage from "./components/WelcomeMessage";
import ChatBox from "./components/ChatBox";
import Products from "./components/Products";
import LoadingSpinner from "./components/LoadingSpinner";
import ThemeToggle from "./components/ThemeToggle";
import LanguageSelector from "./components/LanguageSelector";
import { useTheme } from "./contexts/ThemeContext";
import { useLanguage, isRTL } from "./hooks/useLanguage";
import { getCookie, setCookie, hasCookie } from "./utils/cookies"; // Import any utility functions if needed

function App() {
  const { theme } = useTheme();
  const currentLanguage = useLanguage();
  const [products, setProducts] = useState([]);
  const [isFirstVisit, setIsFirstVisit] = useState(false);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalCategories, setTotalCategories] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Update document direction based on language
  useEffect(() => {
    document.body.dir = isRTL(currentLanguage) ? 'rtl' : 'ltr';
  }, [currentLanguage]);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        
        // Check if this is the first visit
        const lastVisit = getCookie('last_visit');

        if(!hasCookie('lang')) {
          setCookie('lang', currentLanguage, 36500); // 100 years
        }

        if (!lastVisit) {
          setCookie('last_visit', Date.now(), 36500); // 100 years
          setIsFirstVisit(true); // Set to true if no cookie exists

          // Set identifier on the server
          const identifierResponse = await fetch(import.meta.env.VITE_API_BASE_URL + "/set-identifier", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include", // This will send cookies from the browser
          });

          if (!identifierResponse.ok) {
            throw new Error('Failed to set identifier');
          }

          // Get welcome info after setting identifier
          const welcomeResponse = await fetch(import.meta.env.VITE_API_BASE_URL + "/welcome-info", { 
            credentials: "include" 
          });

          if (!welcomeResponse.ok) {
            throw new Error('Failed to fetch welcome info');
          }

          const data = await welcomeResponse.json();
          setTotalProducts(data.total_products);
          setTotalCategories(data.total_categories);
        }

      } catch (error) {
        console.error('Error initializing app:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeApp();
  }, []);

  return (
    <div className="app-container themed-container">
      <div className="container">
        {/* Language Selector */}
        <div className="language-selector-container">
          <LanguageSelector />
        </div>
        
        {/* Theme Toggle Button */}
        <div className="theme-toggle-container">
          <ThemeToggle />
        </div>

        {isLoading && (
          <LoadingSpinner 
            type="clip" 
            color={theme.colors.spinner} 
            size={40} 
            text="Loading application..." 
            overlay={true} 
          />
        )}
        
        { products.length > 0
          ? <Products products={products} />
          : <WelcomeMessage
                isFirstVisit={isFirstVisit}
                totalProducts={totalProducts}
                totalCategories={totalCategories}
            />
        }
        
        {/* ChatBox component. Always visible */}
        <ChatBox
          onResults={(items) => setProducts(items || [])}
          onClear={() => setProducts([])}
          setIsLoading={setIsLoading}
        />
      </div>
    </div>
  );
}

export default App;