import React, { useEffect, useState } from "react";
import WelcomeMessage from "./components/WelcomeMessage";
import ChatBox from "./components/ChatBox";

function App() {
  const [isFirstVisit, setIsFirstVisit] = useState(true);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalCategories, setTotalCategories] = useState(0);

  useEffect(() => {
    // Call FastAPI `/welcome-info` endpoint to get cookie + product/category info
    fetch(import.meta.env.VITE_API_BASE_URL + "/welcome-info", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        setIsFirstVisit(data.is_first_visit);
        setTotalProducts(data.total_products);
        setTotalCategories(data.total_categories);
      });
  }, []);

  return (
    <>
      <WelcomeMessage
        isFirstVisit={isFirstVisit}
        totalProducts={totalProducts}
        totalCategories={totalCategories}
      />
      <ChatBox />
    </>
  );
}

export default App;