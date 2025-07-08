import React from "react";
import Page from "../components/Page";
import NewSearch from "../components/NewSearch";

const HomePage: React.FC = () => {
  return (
    <div>
      <Page>
        <NewSearch />
      </Page>
    </div>
  );
};

export default HomePage;
