import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { GET_BRANDS } from '../graphql/queries';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function BrandsPage() {
  const { loading, error, data } = useQuery(GET_BRANDS);

  if (loading) return <p>Loading brands...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div style={{ fontFamily: "Satoshi" }}>
      <section className="container-fluid py-5 d-flex flex-wrap align-items-center" style={{ paddingRight: 0 }}>
        <img
          src="/images/logo.png"
          alt="VibeStrings Logo"
          style={{
            position: 'absolute',
            top: '20px',
            left: '5rem',
            height: '40px',
          }}
        />
        <div className="col-lg-6" style={{ paddingLeft: '5rem' }}>
          <h1
            style={{
              fontFamily: 'Satoshi',
              fontWeight: 700,
              fontStyle: 'bold',
              fontSize: '56px',
              lineHeight: '100%',
              letterSpacing: '0',
              textAlign: 'center',
              marginBottom: '1rem',
            }}
          >
            Browse top quality <span style={{ color: '#FF5B1C' }}>Guitars</span> online
          </h1>
          <p
            style={{
              fontFamily: 'Satoshi',
              fontWeight: 500,
              fontStyle: 'normal',
              fontSize: '16px',
              lineHeight: '100%',
              letterSpacing: '0',
              textAlign: 'center',
              margin: 0,
            }}
            className="text-muted"
          >
            Explore 60k+ latest collections of branded guitars online with VibeStrings.
          </p>
        </div>
        <div className="col-lg-6 d-flex justify-content-end" style={{ paddingRight: 0}}>
          <img
            src="/images/guitar1.jpg"
            alt="Guitar and amp"
            style={{
              width: '672px',
              height: '586px',
              objectFit: 'cover',
              borderBottomLeftRadius: '360px',
              borderBottomRightRadius: '151px',
              display: 'block',
            }}
          />
        </div>
      </section>


      <section className="container text-center my-5">
        <h2 
        style={{
        fontFamily: 'Satoshi',
        fontWeight: 700,
        fontStyle: 'bold',
        fontSize: '44px',
        lineHeight: '100%',
        letterSpacing: '0',
        textAlign: 'center',
        margin: 0,
      }}>
          Featuring the <span style={{ color: '#FF5B1C' }}>Best Brands</span>
        </h2>
        <p 
        style={{
            fontFamily: 'Satoshi',
            fontWeight: 500,
            fontStyle: 'normal',
            fontSize: '16px',
            lineHeight: '100%',
            letterSpacing: '0',
            textAlign: 'center',
          }}
        className="text-muted">
          Select your preferred brand and explore our exquisite collection.
        </p>
        <div className="row justify-content-center mt-4">
          {data.findAllBrands.map((brand) => (
            <div key={brand.id} className="col-4 col-md-2 mb-4">
              <Link to={`/brand/${brand.id}`}>
                <img
                  src={brand.image}
                  alt={brand.name}
                  style={{
                    filter: 'grayscale(100%)',
                    maxHeight: '55px',
                    objectFit: 'contain',
                    margin: '50px auto 50px auto',
                    opacity: '40%',
                    // width: '189',
                    // height: '71',
                    // top: '1119.31px',
                    // left: '829.62px',
                  }}
                />
              </Link>
            </div>
          ))}
        </div>
      </section>

      
      <section className="py-5" style={{ backgroundColor: '#121212', color: '#fff' }}>
        <div className="container text-center">
          <h2 
          style={{
            fontFamily: 'Satoshi',
            fontWeight: 400,
            fontStyle: 'normal',
            fontSize: '44px',
            lineHeight: '100%',
            letterSpacing: '0',
            textAlign: 'center',
          }}
          >
            Why try <span style={{ color: '#FF5B1C' }}>VibeStrings?</span>
          </h2>
          <div className="row mt-5">
            {[
              { title: 'SMOOTH BROWSING', icon: 'bi-grid', desc: 'Browse our catalog with ease and speed.' },
              { title: 'EASY DELIVERY', icon: 'bi-truck', desc: 'Fast and reliable delivery right to your door.' },
              { title: 'SWIFT PAYMENTS', icon: 'bi-credit-card', desc: 'Secure and quick payment methods.' }
            ].map((item, idx) => (
              <div key={idx} className="col-md-4 mb-4 d-flex flex-column align-items-center">
                <div
                  style={{
                    backgroundColor: '#1E1E1E',
                    width: '60px',
                    height: '60px',
                    borderRadius: '12px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: '20px',
                  }}
                >
                  <i className={`${item.icon}`} style={{ fontSize: '28px', color: '#fff' }}></i>
                </div>

                <h5 
                style={{
                  fontFamily: 'Satoshi',
                  fontWeight: 700,
                  fontStyle: 'normal',
                  fontSize: '18px',
                  lineHeight: '100%',
                  letterSpacing: '0.08em',
                  textAlign: 'center',
                }}
                >{item.title}</h5>
                <p 
                style={{
                  fontFamily: 'Satoshi',
                  fontWeight: 400,
                  fontStyle: 'normal',
                  fontSize: '14px',
                  lineHeight: '100%',
                  letterSpacing: '0',
                  textAlign: 'center',
                  color: '#999'
                }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="container py-5 d-flex flex-wrap align-items-center"
        style={{ minHeight: '80vh' , overflow: 'visible'}}
      >
        <div className="col-lg-6 mb-4 mb-lg-0">
          <h1
            style={{
              fontFamily: 'Satoshi',
              fontWeight: 400,
              fontStyle: 'normal',
              fontSize: '48px', 
              lineHeight: '140%', 
              letterSpacing: '0', 
              textAlign: 'center',
              color: '#000',
              opacity: 1,
            }}
          >
            Browse and buy your <span style={{ color: '#FF5B1C', fontWeight: 500 }}>favorite guitars</span> with VibeStrings.
          </h1>
          <div className="mt-4 d-flex">
            <img
              src="/images/google_play.png"
              alt="Google Play"
              className="me-3"
              style={{ height: '50px', cursor: 'pointer' }}
            />
            <img
              src="/images/apple_store.png"
              alt="App Store"
              style={{ height: '50px', cursor: 'pointer' }}
            />
          </div>
        </div>

        <div className="col-lg-6 position-relative text-center">
         {/* circle */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '500px', 
              height: '320px',
              backgroundColor: '#FF5B1C',
              borderRadius: '50% / 50%',
              zIndex: 0,
            }}
          ></div>

          <img
            src="/images/slikatell1.png"
            alt="App Screen 1"
            style={{
              position: 'relative',
              zIndex: 1,
              width: '160px',
              marginRight: '10px',
              borderRadius: '20px',
              top: '-20px',
            }}
          />
          <img
            src="/images/slikatell2.png"
            alt="App Screen 2"
            style={{
              position: 'relative',
              zIndex: 1,
              width: '160px',
              marginLeft: '10px',
              borderRadius: '20px',
              top: '20px',
            }}
          />
        </div>
      </section>


      {/* footer */}
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
