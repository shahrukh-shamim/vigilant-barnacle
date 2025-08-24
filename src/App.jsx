import React, { useEffect, useState } from "react";
import WelcomeMessage from "./components/WelcomeMessage";
import ChatBox from "./components/ChatBox";
import Products from "./components/Products";
import { getCookie, setCookie } from "./utils/cookies"; // Import any utility functions if needed

function App() {
  const [products, setProducts] = useState([]);
  const [isFirstVisit, setIsFirstVisit] = useState(false);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalCategories, setTotalCategories] = useState(0);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Check if this is the first visit
        const lastVisit = getCookie('last_visit');
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
      }
    };

    initializeApp();
  }, []);

  return (
    <>
      { products.length > 0 ? (
        <Products products={products} />
      ) : (
        <WelcomeMessage
          isFirstVisit={isFirstVisit}
          totalProducts={totalProducts}
          totalCategories={totalCategories}
        />
      )}
      <ChatBox onResults={(items) => setProducts(items || [])}
        onClear={() => setProducts([])} />
    </>
  );
}

export default App;