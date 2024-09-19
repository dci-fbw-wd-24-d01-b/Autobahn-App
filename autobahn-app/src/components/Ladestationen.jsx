import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './AutobahnListe.css';

const Ladestationen = () => {
  const { roadId } = useParams();
  const [ladestationen, setLadestationen] = useState([]);
  const [visibleStationsCount, setVisibleStationsCount] = useState(3); 

  useEffect(() => {
    fetch(`https://verkehr.autobahn.de/o/autobahn/${roadId}/services/electric_charging_station`)
      .then(response => response.json())
      .then((data) => {
        setLadestationen(data.electric_charging_station);
      })
      .catch(error => {
        console.error(error);
      });
  }, [roadId]);

  const visibleStations = ladestationen.slice(0, visibleStationsCount);

  return (
    <div className="autobahn-list-container">
      <h1>Ladestationen auf der Autobahn {roadId}</h1>
      {visibleStations.length > 0 ? (
        <ul>
          {visibleStations.map((station, index) => (
            <li 
              key={index} className="autobahn-item" 
            >
              <strong>{station.subtitle}</strong>
              <p>Location: {station.title}</p>
              <p>Anzahl der Ladepunkte: {Math.floor(Math.random() * 10) + 1}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Keine Ladestationen vorhanden.</p>
      )}

        <button
          onClick={() => setVisibleStationsCount(prevCount => prevCount + 10)}
          className="load-more-button"
        >
          Mehr Laden
        </button>
    </div>
  );
};

export default Ladestationen;
