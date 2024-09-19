import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './AutobahnListe.css';

const Baustellen = () => {
  const { roadId } = useParams();
  const [baustellen, setBaustellen] = useState([]);
  const [visibleBaustellenCount, setVisibleBaustellenCount] = useState(3);

  useEffect(() => {
    fetch(`https://verkehr.autobahn.de/o/autobahn/${roadId}/services/roadworks`)
      .then(response => response.json())
      .then((data) => {
          setBaustellen(data.roadworks);
      })
      .catch(error => {
        console.error(error);
      });
  }, [roadId]);

  const visibleBaustellen = baustellen.slice(0, visibleBaustellenCount);

  return (
    <div className="autobahn-list-container">
      <h1>Baustellen auf der Autobahn {roadId}</h1>
      <ul>
        {visibleBaustellen.length > 0 ? (
          visibleBaustellen.map((baustelle, index) => (
            <li 
              key={index}  className="autobahn-item" 
            >
              {baustelle.description}
            </li>
          ))
        ) : (
          <p>Keine Baustellen gefunden.</p>
        )}
      </ul>
   
        <button 
          onClick={() => setVisibleBaustellenCount(prevCount => prevCount + 10)} 
          className="load-more-button"
        >
          Mehr Laden
        </button>
      
    </div>
  );
};

export default Baustellen;