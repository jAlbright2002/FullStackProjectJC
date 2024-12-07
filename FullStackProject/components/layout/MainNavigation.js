import classes from './MainNavigation.module.css'
import Link from 'next/link'
import HamMenu from "../generic/HamMenu"
import Button from "../generic/Button"
import { useState } from 'react'

function MainNavigation() {

  const [popupToggle, setPopupToggle] = useState(false);

  function toggleMenuHide() {
    console.log('Hamburger menu clicked'); // Debugging log
    setPopupToggle((prevState) => !prevState);
  }
  

  return (
    <header className={classes.header}>
      <HamMenu/>
      <div className={classes.logo}>Personal Task Manager</div>
      <nav>
        <ul>
          <li>
            <Link href='/'>All Projects</Link>
          </li>
          <li>
            <Link href='/new-project'>Add New Project</Link>
          </li>
          <li>
            <Link href='/new-ticket'>Add New Ticket</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation
