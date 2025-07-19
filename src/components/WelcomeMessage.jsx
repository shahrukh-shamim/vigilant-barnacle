import React from "react";

const WelcomeMessage = ({ isFirstVisit, totalProducts, totalCategories }) => {
  return (
    <div id="assistant">
      {isFirstVisit ? (
        <>
          👋 <strong>Welcome to our store!</strong><br /><br />
          We offer <strong>{totalCategories}+</strong> categories, nearly{" "}
          <strong>{totalProducts + 1}</strong> products, and a variety of{" "}
          <strong>top brands</strong>.<br /><br />
          Would you like some help getting started? 😊
        </>
      ) : (
        <>
          👋 <strong>Welcome back!</strong><br />
          Let me know if you need help finding something.
        </>
      )}
    </div>
  );
};

export default WelcomeMessage;