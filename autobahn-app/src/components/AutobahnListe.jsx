import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const AutobahnListe = () => {
  const [autobahnen, setAutobahnen] = useState([]);
  // const { roadId } = useParams();

  useEffect(() => {
    fetch('https://verkehr.autobahn.de/o/autobahn')
      .then(response => response.json())
      .then(data => setAutobahnen(data.roads))
       
      .catch(error => console.error( error));
  }, []);

  return (
    <div>
      <h1 >Autobahnen</h1>
      <ul>
        { autobahnen.length > 0 ? (
          autobahnen.map((autobahn, index) => (
            <li key={index}>
              <h2>{autobahn}</h2>
              <Link to={`/autobahn/${autobahn}/baustellen`}>
                <button>Baustellen</button>
              </Link>
              <Link to={`/autobahn/${autobahn}/warnungen`}>
                <button>Warnungen</button>
              </Link>
              <Link to={`/autobahn/${autobahn}/ladestationen`}>
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