import React from "react";
import MainHeader from "./MainHeader";
import NavLinks from "./NavLink";
import TopBar from "../../topbar/topbar";

const MainNavigation = props => {
    return (
        <MainHeader>
            <TopBar />
            <nav>
                <NavLinks />
            </nav>
        </MainHeader>
    );
};

export default MainNavigation;
