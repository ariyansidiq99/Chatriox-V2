import { memo, useCallback } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useTheme }  from '../contexts/ThemeContext';
import { useAuth }   from '../contexts/AuthContext';
import { useNotify } from '../contexts/NotificationContext';
import { useWindowSize } from '../hooks/useWindowSize';
import { useToggle }     from '../hooks/useToggle';
import { Button } from './ui';

const Navbar = memo(function Navbar() {
  const { theme, toggleTheme }  = useTheme();
  const { user, isAuth, logout } = useAuth();
  const notify    = useNotify();
  const navigate  = useNavigate();
  const { isMobile } = useWindowSize();
  const [menuOpen, toggleMenu, , closeMenu] = useToggle(false);

  const handleLogout = useCallback(() => {
    logout();
    notify.success('Logged out successfully');
    navigate('/');
    closeMenu();
  }, [logout, notify, navigate, closeMenu]);

  const linkClass = ({ isActive }) =>`nav__link ${isActive ? 'nav__link--active' : ''}`;

  return (
    <header className='navbar'>
      <div className='container navbar__inner'>
        <Link to='/' className='navbar__logo' onClick={closeMenu}>
          <span>✉</span> Chatriox
        </Link>
        {!isMobile && (
          <nav className='navbar__nav'>
            <NavLink to='/'         className={linkClass} end>Home</NavLink>
            <NavLink to='/features' className={linkClass}>Features</NavLink>
            <NavLink to='/pricing'  className={linkClass}>Pricing</NavLink>
            {isAuth && <NavLink to='/campaigns' className={linkClass}>Campaigns</NavLink>}
          </nav>
        )}
        <div className='navbar__actions'>
          <button className='theme-btn' onClick={toggleTheme} aria-label='Toggle theme'>
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
          {isAuth ? (
            <div className='user-menu'>
              <span className='avatar'>{user.avatar}</span>
              {!isMobile && <span>{user.name}</span>}
              <Button variant='outline' size='sm' onClick={handleLogout}>Logout</Button>
            </div>
          ) : (
            !isMobile && (
              <>
                <Link to='/login' className='btn btn--outline btn--sm'>Login</Link>
                <Link to='/pricing' className='btn btn--primary btn--sm'>Get Started</Link>
              </>
            )
          )}
          {isMobile && (
            <button className='hamburger' onClick={toggleMenu} aria-label='Menu'
              aria-expanded={menuOpen}>
              <span className={`hamburger__line ${menuOpen ? 'open' : ''}`} />
              <span className={`hamburger__line ${menuOpen ? 'open' : ''}`} />
              <span className={`hamburger__line ${menuOpen ? 'open' : ''}`} />
            </button>
          )}
        </div>
      </div>
      {isMobile && menuOpen && (
        <div className='mobile-menu'>
          <NavLink to='/'         onClick={closeMenu} className={linkClass} end>Home</NavLink>
          <NavLink to='/features' onClick={closeMenu} className={linkClass}>Features</NavLink>
          <NavLink to='/pricing'  onClick={closeMenu} className={linkClass}>Pricing</NavLink>
          {isAuth && <NavLink to='/campaigns' onClick={closeMenu} className={linkClass}>Campaigns</NavLink>}
          {isAuth
            ? <button onClick={handleLogout} className='btn btn--outline'>Logout</button>
            : <Link to='/login' onClick={closeMenu} className='btn btn--primary'>Login</Link>
          }
        </div>
      )}
    </header>
  );
});

export default Navbar;
