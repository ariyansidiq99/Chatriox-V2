import { memo } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Home = memo(function Home() {
  const { isAuth } = useAuth();

  return (
    <div className='home-page'>
      {/* Hero */}
      <section className='hero'>
        <div className='container hero__inner'>
          <div className='hero__content'>
            <span className='hero__badge'>Trusted by 2,000+ businesses</span>
            <h1 className='hero__headline'>
              Send Messages.<br />Get Replies.<br />
              <span className='hero__headline--accent'>Grow Faster.</span>
            </h1>
            <p className='hero__subtext'>
              Chatriox is the all-in-one messaging platform.
              Launch WhatsApp campaigns, automate emails, and track every result.
            </p>
            <div className='hero__actions'>
              {isAuth ? (
                <Link to='/campaigns' className='btn btn--primary btn--lg'>
                  Go to Dashboard
                </Link>
              ) : (
                <>
                  <Link to='/pricing'  className='btn btn--primary btn--lg'>Start Free Trial</Link>
                  <Link to='/features' className='btn btn--outline btn--lg'>See Features</Link>
                </>
              )}
            </div>
            <p className='hero__disclaimer'>No credit card required. Free for 14 days.</p>
          </div>
          <div className='hero__stats'>
            {[['98%','Open Rate'],['4.2x','Reply Rate'],['2K+','Businesses']].map(([val,lbl]) => (
              <div key={lbl} className='hero-stat'>
                <span className='hero-stat__value'>{val}</span>
                <span className='hero-stat__label'>{lbl}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
});

export default Home;
 
