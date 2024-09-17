import React from 'react';
import { Link, useParams } from 'react-router-dom';

const AutobahnDetail = () => {
  const { roadId } = useParams();

  return (
    <div>
      <h1>Details zur Autobahn {roadId}</h1>
      <Link to={`/autobahn/:${roadId}/baustellen`}>
        <button>Baustellen anzeigen</button>
      </Link>
      <Link to={`/autobahn/:${roadId}/warnungen`}>
        <button>Warnungen anzeigen</button>
      </Link>
      <Link to={`/autobahn/:${roadId}/ladestationen`}>
        <button>Ladestationen anzeigen</button>
      </Link>
    </div>
  );
};

export default AutobahnDetail;