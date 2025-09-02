"use client";


import { UserButton } from "@clerk/nextjs";

interface Props{
    showName?: boolean;
};
export const UserControl = ({showName}: Props) => {

    return(
            <UserButton
                showName={showName}
                appearance={{
                    elements: {
                    userButtonBox: "text-white", // <-- makes the name white
                    userButtonOuterIdentifier: "text-white", // for the name specifically
                    },
                        
        }}>

        </UserButton>
    );

};