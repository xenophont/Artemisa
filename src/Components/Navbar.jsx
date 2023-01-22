import React from 'react'
import { BrowserRouter, Route, Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/Terms">Terms and Services</Link>
        </li>
        <li>
          <Link to="/Privacy">Privacy</Link>
        </li>
      </ul>
    </nav>
  )
}
