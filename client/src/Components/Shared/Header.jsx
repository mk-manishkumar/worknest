import React from "react";

const Header = ({ title }) => {
  return (
    <header className="text-center text-white bg-primary reg-header">
      <h2 className="mb-5 register-header">{title}</h2>
    </header>
  );
};

export default Header;
