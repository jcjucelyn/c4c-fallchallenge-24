import { useState, useEffect } from 'react';
import PartnerTile from './PartnerTile';
import axios from 'axios';


/*
  The top-level component containing everything relevant to the dashboard,
  including information on each partner
*/

function Dashboard() {
    const [partners, setPartners] = useState([])
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          // const response = await axios.get('/api/partners');
          const response = await axios.get('http://localhost:4000/api/partners');
          
          setPartners(response.data); // Update state with fetched data
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchData();
    }, []);

    const handleClick = async (partnerName) => {
      try{
        setPartners(prevPartners => prevPartners.filter(partner => partner.name !== partnerName));
        
        // request delete from JSON file
        await axios.delete(`http://localhost:4000/api/partners/${partnerName}`);
        console.log('Successfully deleted partner')
      } catch (error) {
        console.error('Error deleting partner: ', error);
        fetchData();
      }
    }

  return (
    <div id="main-content">
      <div id="main-partners-grid">
        {partners.length === 0 ? (
        <p>Loading...</p>): (

         partners.map(partner => ( 
          
           <PartnerTile key={partner.name} partnerData={partner} onDelete={handleClick} /> 
         ))

         )}

      </div>
    </div>
  );
};

export default Dashboard;