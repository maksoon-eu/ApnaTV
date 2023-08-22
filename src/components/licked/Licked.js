import React, { useEffect, createContext, useState } from "react";

const LickedContext = createContext();

const getLicked = () => {
    const licked = JSON.parse(localStorage.getItem("licked"));
    if (!licked) {
        // Default licked is taken as dark-licked
        localStorage.setItem("licked", []);
        return [];
    } else {
        return licked;
    }
};

const LickedProvider = ({ children }) => {
    const [licked, setLicked] = useState(getLicked);

    function toggleLicked(item) {
        if (licked.length > 0) {
            if (licked.some(el => el.id === item.id)) {
                setLicked(licked.filter(el => el.id !== item.id));
            } else {
                setLicked([...licked, ...[item]]);
            }
        } else {
            setLicked([item]);
        }
    };

    useEffect(() => {
        const refreshLicked = () => {
            localStorage.setItem("licked", JSON.stringify(licked));
        };

        refreshLicked();
    }, [licked]);

    return (
        <LickedContext.Provider
        value={{
            licked,
            setLicked,
            toggleLicked,
        }}
        >
        {children}
        </LickedContext.Provider>
    );
};

export { LickedContext, LickedProvider };