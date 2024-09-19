import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './AutobahnListe.css';

const AutobahnListe = () => {
  const [autobahnen, setAutobahnen] = useState([]);
  const [search, setSearch] = useState('');
  const [visibleAutobahnenCount, setVisibleAutobahnenCount] = useState(3);

  useEffect(() => {
    fetch('https://verkehr.autobahn.de/o/autobahn')
      .then(response => response.json())
      .then(data => {
        setAutobahnen(data.roads);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const filteredAutobahnen = autobahnen.filter(autobahn =>
    autobahn.toLowerCase().includes(search.toLowerCase())
  );

  const visibleAutobahnen = filteredAutobahnen.slice(0, visibleAutobahnenCount);


  return (
    <div className="autobahn-list-container">
      <h1>Autobahnen</h1>

      <input
        type="text"
        placeholder="Autobahn suchen..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />

      <ul className="autobahn-list">
        {visibleAutobahnen.length > 0 ? (
          visibleAutobahnen.map((autobahn, index) => (
            <li key={index} className="autobahn-item">
              <h2 className= "autobahn-name">{autobahn}</h2>
              <div className="button-group">
                <Link to={`/autobahn/${autobahn}/baustellen`}>
                  <button className="action-button">Baustellen</button>
                </Link>
                <Link to={`/autobahn/${autobahn}/warnungen`}>
                  <button className="action-button">Warnungen</button>
                </Link>
                <Link to={`/autobahn/${autobahn}/ladestationen`}>
                  <button className="action-button">Ladestationen</button>
                </Link>
              </div>
            </li>
          ))
        ) : (
          <p>Keine Autobahnen gefunden.</p>
        )}
      </ul>

        <button
          onClick={() => setVisibleAutobahnenCount(prevCount => prevCount + 10)}
          className="load-more-button"
        >
          Mehr Laden
        </button>
    </div>
  );
};

export default AutobahnListe;