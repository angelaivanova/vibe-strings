import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_GUITAR_DETAILS } from '../graphql/queries';

export default function GuitarDetailsPage() {
  const { brandId, guitarId } = useParams();

  const { loading, error, data } = useQuery(GET_GUITAR_DETAILS, {
    variables: { brandId, modelId: guitarId },
  });

  const [activeTab, setActiveTab] = useState('specs');
  const [visibleCount, setVisibleCount] = useState(2);

  if (loading) return <p>Loading guitar...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const guitar = data.findUniqueModel;
  const specsEntries = guitar.specs
    ? Object.entries(guitar.specs).filter(([key]) => key !== '__typename')
    : [];

  return (
    <div style={{ fontFamily: 'Satoshi, sans-serif', backgroundColor: '#fff' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '40px',
          padding: '40px',
          marginBottom: '40px',
        }}
      >
      
        <div style={{ flex: 1 }}>
          <div
            style={{
              position: 'absolute',
              top: '20px',
              left: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '15px',
              zIndex: 10,
            }}
          >
            <Link
              to={`/brand/${brandId}`}
              style={{
                fontSize: '14px',
                color: '#555',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                whiteSpace: 'nowrap',
              }}
            >
              ← Back
            </Link>

            <img
              src="/images/logo.png"
              alt="VibeStrings Logo"
              style={{ height: '32px' }}
            />
          </div>

          <h1 style={{ fontSize: '40px', fontWeight: '700', margin: 0 }}>
            {guitar.name}
          </h1>
        </div>

        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(180deg, #FF5B1C, #fa9d79ff)',
            borderBottomLeftRadius: '360px',
            borderBottomRightRadius: '151px',
            height: '400px',
            position: 'relative',
          }}
        >
          <img
            src={guitar.image}
            alt={guitar.name}
            style={{
              width: '70%',
              height: 'auto',
              objectFit: 'contain',
            }}
          />
        </div>
      </div>


      <div style={{ display: 'flex', borderBottom: '1px solid #eee', margin: '0 40px 20px 40px' }}>
        <button
          onClick={() => setActiveTab('specs')}
          style={{
            flex: 1,
            padding: '12px 0',
            border: 'none',
            borderBottom: activeTab === 'specs' ? '2px solid #FF5B1C' : '2px solid transparent',
            background: 'none',
            fontWeight: activeTab === 'specs' ? '700' : '500',
            cursor: 'pointer',
            color: activeTab === 'specs' ? '#FF5B1C' : '#555',
            fontSize: '16px',
          }}
        >
          Specification
        </button>
        <button
          onClick={() => setActiveTab('musicians')}
          style={{
            flex: 1,
            padding: '12px 0',
            border: 'none',
            borderBottom: activeTab === 'musicians' ? '2px solid #FF5B1C' : '2px solid transparent',
            background: 'none',
            fontWeight: activeTab === 'musicians' ? '700' : '500',
            cursor: 'pointer',
            color: activeTab === 'musicians' ? '#FF5B1C' : '#555',
            fontSize: '16px',
          }}
        >
          Who plays it?
        </button>
      </div>

      <div style={{ padding: '0 40px 40px 40px' }}>
        {activeTab === 'specs' && (
          <>
            <p style={{ fontSize: '20px', lineHeight: '1.6', color: '#555', marginTop: '20px' }}>
              {guitar.description}
            </p>
            <ul style={{ listStyle: 'disc', paddingLeft: '20px', lineHeight: '1.8' }}>
              {specsEntries.map(([key, value]) => (
                <li key={key}>
                  <strong>{key}:</strong> {value || 'N/A'}
                </li>
              ))}
            </ul>
            
          </>
        )}

        {activeTab === 'musicians' && (
          <div>
            {guitar.musicians.slice(0, visibleCount).map((musician, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '15px',
                  borderBottom: '1px solid #eee',
                  paddingBottom: '10px',
                }}
              >
                <img
                  src={musician.musicianImage}
                  alt={musician.name}
                  style={{
                    width: '80px',
                    height: '80px',
                    objectFit: 'cover',
                    borderRadius: '8px',
                    marginRight: '15px',
                  }}
                />
                <div>
                  <p style={{ margin: 0, fontWeight: 'bold' }}>{musician.name}</p>
                  <p style={{ fontStyle: 'italic', fontSize: '0.9em', margin: 0 }}>
                    {musician.bands?.join(', ')}
                  </p>
                </div>
              </div>
            ))}
            {visibleCount < guitar.musicians.length && (
              <button
                onClick={() => setVisibleCount(visibleCount + 2)}
                style={{
                  marginTop: '10px',
                  padding: '8px 16px',
                  backgroundColor: '#FF5B1C',
                  border: 'none',
                  color: 'white',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                Show More
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
