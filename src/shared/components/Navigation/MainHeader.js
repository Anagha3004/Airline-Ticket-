import React from "react";

const MainHeader = props => {
    return (
        <div>
            {props.children} {/* This will include TopBar and NavLinks */}
        </div>
    );
};

export default MainHeader;
