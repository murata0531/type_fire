import React from 'react';
import logo from './logo.svg';
import './App.css';

(async () => {
  try {
    const firebase = require('firebase')
    const config = {
      apiKey: '### FIREBASE API KEY ###',
      authDomain: '### FIREBASE AUTH DOMAIN ###',
      projectId: '### CLOUD FIRESTORE PROJECT ID ###',
    }
    firebase.initializeApp(config)
    const db = firebase.firestore()

    const userRef = db.collection('users').doc('kpUVKKold2s0rMcDnPTx')
    const userDoc = await userRef.get()
    if (userDoc.exists) {
      console.log(userDoc.id)
      console.log(userDoc.data())
      console.log(userDoc.get('name'))
      console.log(userDoc.get('old'))
    } else {
      console.log('No such document!')
    }
    await db.app.delete()
  } catch (err) {
    console.log(`Error: ${JSON.stringify(err)}`)
  }
})()

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
