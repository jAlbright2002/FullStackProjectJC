import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import HamMenu from '../generic/HamMenu';
import classes from './MainNavigation.module.css';

function MainNavigation() {
  const [popupToggle, setPopupToggle] = useState(false);
  const router = useRouter();

  function toggleMenuHide() {
    setPopupToggle((prevState) => !prevState);
  }

  function closeMenuAndNavigate(url) {
    setPopupToggle(false); 
    router.push(url); 
  }

  return (
    <header className={classes.header}>
      <HamMenu toggleMenuHide={toggleMenuHide} />
      <div className={classes.logo}>Personal Task Manager</div>

      {popupToggle && (
        <div className={classes.dropdownMenu}>
          <nav>
            <ul>
              <li>
                <Link href='/'>
                  <a onClick={() => closeMenuAndNavigate('/')}>All Projects</a>
                </Link>
              </li>
              <li>
                <Link href='/new-project'>
                  <a onClick={() => closeMenuAndNavigate('/new-project')}>
                    Add New Project
                  </a>
                </Link>
              </li>
              <li>
                <Link href='/new-ticket'>
                  <a onClick={() => closeMenuAndNavigate('/new-ticket')}>
                    Add New Ticket
                  </a>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}

export default MainNavigation;
