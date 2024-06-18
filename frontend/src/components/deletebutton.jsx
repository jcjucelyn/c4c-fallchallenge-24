// The "alter data" button

import React from "react";
import axios from "axios";

function delButton(adj) {
    const { text } = adj;
    
    // on click, add the fields of inputted data
    const handleClick = async () => {
        try{

            // Delete request to backend
            await axios.delete('http://localhost:4000/api/partners/${partnerData.name}')
            onDelete(partnerData.name);
        } catch (error) {
            console.error('Error deleting partner: ', error)
        }
    };


    return (
        <div className="partner-tile">
        <img className="partner-thumbnail" src={partnerData.thumbnailUrl} />
        <hr />
        <div className="partner-info">
          <h3>{partnerData.name}</h3>
          <p>{partnerData.description}</p>
          {partnerData.active ? (
                      <p>Active</p>
                  ) : (
                      <p>Inactive</p>
                  )}
          <button onClick={handleClick}>Delete</button>
        </div>
      </div>
    );
}

export default AddButton;

