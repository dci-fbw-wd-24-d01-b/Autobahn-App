import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Ladestationen = () => {
  const { roadId } = useParams();
  const [ladestationen, setLadestationen] = useState([]);

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


  return (
    <div>
      <h1>Ladestationen auf der Autobahn {roadId}</h1>
      {ladestationen.length > 0 ? (
        <ul>
          {ladestationen.map((station, index) => (
            <li key={index}>
              <strong>{station.name}</strong>
              <p>Adresse: {station.address}</p>
              <p>Anzahl der Ladepunkte: {station.totalChargingPoints}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Keine Ladestationen vorhanden.</p>
      )}
    </div>
  );
};

export default Ladestationen;
