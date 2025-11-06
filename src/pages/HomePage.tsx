import React from "react";
import Page from "./Page";
import Search from "../components/Search";

const HomePage: React.FC = () => {
  return (
    <div>
      <Page>
        <Search />
      </Page>
    </div>
  );
};

export default HomePage;
