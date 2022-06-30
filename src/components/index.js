import React, { useState } from 'react'
import './index.css';
import Header from './Header';
import Dashboard from './Dashboard';
export default function index() {
  
    return (
        <div>
            <Header title={"eMagz"} />
            <Dashboard />
        </div>
    )
}
