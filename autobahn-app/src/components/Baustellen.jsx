import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Baustellen = () => {
  const { roadId } = useParams();
  const [baustellen, setBaustellen] = useState([]);

  useEffect(() => {
    fetch(`https://verkehr.autobahn.de/o/autobahn/${roadId}/services/roadworks`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data && Array.isArray(data.roadworks)) {
          setBaustellen(data.roadworks); 
        } else {
          setBaustellen([]); 
        }
      })
      .catch(error => {
        console.error(error);
      });
  }, [roadId]);


  return (
    <div>
      <h1>Baustellen auf der Autobahn {roadId}</h1>
      <ul>
        {Array.isArray(baustellen) && baustellen.length > 0 ? (
          baustellen.map((baustelle, index) => (
            <li key={index}>{baustelle.description}</li>
          ))
        ) : (
          <p>Keine Baustellen gefunden.</p>
        )}
      </ul>
    </div>
  );
};

export default Baustellen;