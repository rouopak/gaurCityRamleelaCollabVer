import React from 'react';
import MainMembersClient from "./MainMembersClient";

const MainMembers = () => {
    const members = [
        {
            id: "1",
            name: "Sh. Tejpal Nagar",
            role: "MLA Noida Dadri",
            photo: "/images/main members/tejpal.png",
        },
        {
            id: "2",
            name: "Sh. Shrichand Sharma",
            role: "Member of Legislative Council (MLC)",
            photo: "/images/main members/shrichand-sharma.jpg",
        },
        {
            id: "3",
            name: "Sh. Sumit Kumar",
            role: "Settlor / व्यवस्थापक",
            photo: "/images/main members/sumit-kumar.jpg",
        },
        {
            id: "4",
            name: "Sh. R S Uppal",
            role: "President / अध्यक्ष",
            photo: "/images/main members/rs-uppal.jpg",
        }
    ];

    return <MainMembersClient initialMembers={members} />;
};

export default MainMembers;