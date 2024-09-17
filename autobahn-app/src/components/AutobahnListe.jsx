import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const AutobahnListe = () => {
  const [autobahnen, setAutobahnen] = useState([]);
  const { roadId } = useParams();

  useEffect(() => {
    fetch('https://verkehr.autobahn.de/o/autobahn')
      .then(response => response.json())
      .then(data => setAutobahnen(data))
       
      .catch(error => console.error( error));
  }, []);

  return (
    <div>
      <h1>Autobahnen</h1>
      <ul>
        {Array.isArray(autobahnen) && autobahnen.length > 0 ? (
          autobahnen.map((autobahn, index) => (
            <li key={index}>
              <h2>{autobahn.name}</h2>
              <Link to={`/autobahn/:${roadId}/baustellen`}>
                <button>Baustellen</button>
              </Link>
              <Link to={`/autobahn/:${roadId}/warnungen`}>
                <button>Warnungen</button>
              </Link>
              <Link to={`/autobahn/:${roadId}/ladestationen`}>
                <button>Ladestationen</button>
              </Link>
            </li>
          ))
        ) : (
          <p>Keine Autobahnen gefunden.</p>
        )}
      </ul>
    </div>
  );
};

export default AutobahnListe;