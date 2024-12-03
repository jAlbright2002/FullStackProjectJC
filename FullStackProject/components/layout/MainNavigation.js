import classes from './MainNavigation.module.css'
import Link from 'next/link'
import HamMenu from "../generic/HamMenu"
import Button from "../generic/Button"
import { useState } from 'react'

function MainNavigation() {
  let noOfOrders = 50;

  let [popupToggle, setPopupToggle] = useState(false)

  function ordersCallback(aNumber) {
    alert("You clicked the button, and passed: " + aNumber)
  }

  function checkoutCallback() {
    alert("You clicked the checkout button")
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
      <Button text1="Register" maxWidth="100px" onClickHandler={() => checkoutCallback()}/>
      <Button text2="Login" maxWidth="70px" onClickHandler={() => ordersCallback(noOfOrders)} />
    </header>
  );
}

export default MainNavigation
