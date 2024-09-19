import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './AutobahnListe.css';

const Warnungen = () => {
  const { roadId } = useParams();
  const [warnungen, setWarnungen] = useState([]);
  const [visibleWarnungenCount, setVisibleWarnungenCount] = useState(3); 

  useEffect(() => {
    fetch(`https://verkehr.autobahn.de/o/autobahn/${roadId}/services/warning`)
      .then(response => response.json())
      .then((data) => {
        setWarnungen(data.warning); 
        console.log(data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [roadId]);

  const visibleWarnungen = warnungen.slice(0, visibleWarnungenCount);

  return (
    <div className="autobahn-list-container">
      <h1>Warnungen auf der Autobahn {roadId}</h1>
      <ul>
        {visibleWarnungen.length > 0 ? (
          visibleWarnungen.map((warnung, index) => (
            <li 
              key={index} className="autobahn-item"
            >
              <strong>{warnung.title}</strong>
              <p>{warnung.description}</p>
            </li>
          ))
        ) : (
          <p>Keine Warnungen vorhanden.</p>
        )}
      </ul>

        <button
          onClick={() => setVisibleWarnungenCount(prevCount => prevCount + 10)}
          className="load-more-button"
        >
          Mehr Laden
        </button>
    </div>
  );
};

export default Warnungen;