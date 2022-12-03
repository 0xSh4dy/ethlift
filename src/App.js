import React from 'react';
import './App.css';
import Account from './Components/Account';
import Details from './Components/Details';
import { useSelector } from 'react-redux';
import { selectAccount } from './features/accountSlice';
import Body from './Components/Transfer';

function App() {
  const account = useSelector(selectAccount);
  return (
    <div>
      <Details/>
      <Account/>
      <Body/>
    </div>
  );
}

export default App;
