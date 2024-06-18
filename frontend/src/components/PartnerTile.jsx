import React from 'react';
import axios from 'axios';


/*
  A block for a single partner, containing information for them
  along with any tools to manage said information
*/

function PartnerTile({ partnerData, onDelete }) {
  console.log(partnerData)
  if (!partnerData) {
    console.log('Partner data is null')
  }

  // add a "delete" button to each tile
  const handleClick = async () => {
    try{
        // Delete request to backend
        await axios.delete('http://localhost:4000/api/partners/${partnerData.name}')
        onDelete(partnerData.name);
        console.log('Partner deleted successfully.')
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
  )
}

export default PartnerTile;