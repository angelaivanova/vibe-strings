import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_MODELS_BY_BRAND } from '../graphql/queries';
import { GET_UNIQUE_BRAND } from '../graphql/queries';


export default function ModelsPage() {
  const { brandId } = useParams();
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('');
  const [sortBy, setSortBy] = useState({ field: 'name', order: 'ASC' });

  const { loading, error, data } = useQuery(GET_MODELS_BY_BRAND, {
    variables: { id: brandId, sortBy },
  });
 const { data: brandData, loading: brandLoading, error: brandError } = useQuery(GET_UNIQUE_BRAND, {
    variables: { id: brandId },
  });

  if (loading || brandLoading) return <p>Loading models...</p>;
  if (error || brandError) return <p>Error: {error.message}</p>;

  const brand = brandData?.findUniqueBrand;
  if (!brand) {
    return <p>Brand not found</p>;
  }

  const filteredModels = data.findBrandModels.filter((model) => {
    return (
      model.name.toLowerCase().includes(search.toLowerCase()) &&
      (filterType ? model.type.toLowerCase() === filterType.toLowerCase() : true)
    );
  });

  return (
    <div style={{ fontFamily: 'Satoshi, sans-serif', padding: '40px', backgroundColor: '#fff' }}>
      <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '40px',
        marginBottom: '60px',
      }}
      >
  
      <div style={{ flex: 1 }}>
        <Link
          to="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            fontSize: '14px',
            color: '#555',
            textDecoration: 'none',
            marginBottom: '20px',
          }}
        >
          ← Back To Home
        </Link>

        <img
          src="/images/logo.png"
          alt="VibeStrings Logo"
          style={{ height: '32px', marginBottom: '20px' }}
        />

        <h1 style={{ fontSize: '40px', fontWeight: '700', margin: '0 0 20px 0' }}>
          Play like a <span style={{ color: '#FF5B1C' }}>Rock star</span>
        </h1>

        
          <p style={{ fontSize: '14px', lineHeight: '1.6', color: '#555', maxWidth: '500px' }}>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          </p>
          
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
          src={brand.image}
           alt={`${brand.name} Logo`}
            style={{
              width: '60%',
              height: 'auto',
              objectFit: 'contain',
              opacity: '50%',
              filter: 'grayscale(100%)',
            }}
        />
      </div>
    </div>
      
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '700', margin: 0 }}>
          Check out the <span style={{ color: '#FF5B1C' }}>Selection</span>
        </h1>
      </div>

      <div
        style={{
          display: 'flex',
          gap: '10px',
          justifyContent: 'center', 
          marginBottom: '30px',
        }}
      >
        <input
          type="text"
          placeholder="Search by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: '200px', 
            padding: '8px 12px', 
            borderRadius: '8px',
            border: '1px solid #ddd',
            fontSize: '14px',
          }}
        />
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          style={{
            width: '150px', 
            padding: '8px 12px', 
            borderRadius: '8px',
            border: '1px solid #ddd',
            fontSize: '14px',
          }}
        >
          <option value="">All Types</option>
          <option value="electric">Electric</option>
          <option value="acoustic">Acoustic</option>
          <option value="bass">Bass</option>
          <option value="classical">Classical</option>
        </select>
      </div>


      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '24px',
        }}
      >
        {filteredModels.map((model) => (
          <Link
            key={model.id}
            to={`/brand/${brandId}/guitar/${model.id}`}
            style={{
              backgroundColor: '#fff',
              border: '1px solid #eee',
              borderRadius: '12px',
              textAlign: 'center',
              textDecoration: 'none',
              color: '#000',
              boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              padding: '20px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 6px rgba(0,0,0,0.05)';
            }}
          >
            <img
              src={model.image}
              alt={model.name}
              style={{
                width: '100%',
                height: '200px',
                objectFit: 'contain',
                marginBottom: '10px',
              }}
            />
            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '5px' }}>{model.name}</h3>
            <p style={{ fontSize: '14px', color: '#777', marginBottom: '5px' }}>{model.type}</p>
            <p style={{ fontSize: '14px', fontWeight: '500', color: '#FF5B1C' }}>${model.price}</p>
          </Link>
        ))}
      </div>
     
      <footer style={{ backgroundColor: '#f5f5f5', padding: '40px 0' }}>
        <div className="container">
          <div className="row text-muted">
            
            <div className="col-md-3 mb-4">
              <div className="d-flex align-items-center mb-3">
                <img src="/images/logo.png" alt="VibeStrings" style={{ height: '28px', marginRight: '8px' }} />
                <span style={{ fontFamily: 'Satoshi', fontWeight: 500, color: '#000' }}>VibeStrings</span>
              </div>
              <p className="mb-1">
                <i className="bi bi-envelope me-2"></i>
                Enquiry@VibeStrings.com
              </p>
              <p>
                <i className="bi bi-geo-alt me-2"></i>
                San Francisco
              </p>
            </div>

            <div className="col-md-3 mb-4">
              <h6 
              style={{
                fontFamily: 'Satoshi',
                fontWeight: 700,
                fontStyle: 'normal', 
                fontSize: '18px',
                lineHeight: '100%',
                letterSpacing: '0',
                textTransform: 'uppercase',
                color: '#000',
              }}
              >PAGES</h6>
              <ul className="list-unstyled mt-3">
                <li className="mb-2">Store</li>
                <li className="mb-2">Collections</li>
                <li>Support</li>
              </ul>
            </div>

            <div className="col-md-3 mb-4">
              <h6
              style={{
                fontFamily: 'Satoshi',
                fontWeight: 700,
                fontStyle: 'normal', 
                fontSize: '18px',
                lineHeight: '100%',
                letterSpacing: '0',
                textTransform: 'uppercase',
                color: '#000',
              }}
              >PRODUCT</h6>
              <ul className="list-unstyled mt-3">
                <li className="mb-2">Terms</li>
                <li className="mb-2">Privacy Policy</li>
                <li>Copyright</li>
              </ul>
            </div>

            <div className="col-md-3 mb-4">
              <h6 
              style={{
                fontFamily: 'Satoshi',
                fontWeight: 700,
                fontStyle: 'normal', 
                fontSize: '18px',
                lineHeight: '100%',
                letterSpacing: '0',
                textTransform: 'uppercase',
                color: '#000',
              }}
                    >FOLLOW US</h6>
              <div className="mt-3">
                <i className="bi bi-facebook me-3"></i>
                <i className="bi bi-twitter me-3"></i>
                <i className="bi bi-instagram"></i>
              </div>
            </div>
          </div>

          <div className="text-center mt-4" style={{ fontSize: '14px', color: '#777' }}>
            © 2022 Copyright VibeStrings
          </div>
        </div>
      </footer>
    </div>
  );
}
