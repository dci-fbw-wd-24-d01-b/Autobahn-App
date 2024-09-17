import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Warnungen = () => {
  const { roadId } = useParams();
  const [warnungen, setWarnungen] = useState([]);

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
  }, []);

  return (
    <div>
      <h1>Warnungen auf der Autobahn {roadId}</h1>
      <ul>
        {warnungen.length > 0 ? (
          warnungen.map((warnung, index) => (
            <li key={index}>
              <strong>{warnung.title}</strong>
              <p>{warnung.description}</p>
              <p>Beginn: {warnung.start}</p>
              <p>Ende: {warnung.end}</p>
            </li>
          ))
        
      ) : (
        <p>Keine Warnungen vorhanden.</p>
      )}
      </ul>
    </div>
  );
};

export default Warnungen;