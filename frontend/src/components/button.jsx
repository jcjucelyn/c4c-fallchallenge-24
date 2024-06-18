// The "alter data" button

import React from "react";

function AddButton(adj) {
    const { text } = adj;
    
    // on click, add the fields of inputted data
    const handleClick = () => {
        console.log('add button clicked');
    };


    return (
        <button onClick={handleClick}>
            {text || 'Add Partners'}
        </button>
    );
}

export default AddButton;

