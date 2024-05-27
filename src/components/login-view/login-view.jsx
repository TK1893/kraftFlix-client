import React, { useState } from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';

export const LoginView = ({ onLoggedIn }) => {
  // Zustandshooks für Benutzername, Passwort, Email
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    // Datenobjekt mit Benutzername und Passwort
    const data = {
      access: username,
      secret: password,
    };

    // Anfrage an den Server senden
    fetch('https://kraftflix-api-d019e99d109c.herokuapp.com/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Login response: ', data);
        if (data.user) {
          localStorage.setItem('user', JSON.stringify(data.user));
          localStorage.setItem('token', data.token);
          onLoggedIn(data.user, data.token);
        } else {
          alert('No such user');
        }
      })
      .catch((e) => {
        alert('Something went wrong');
      });
  };

  // TODO: wieder entkommentieren
  // // Handler für Änderungen im Benutzernamenfeld
  // const handleUsernameChange = (event) => {
  //   setUsername(event.target.value);
  // };

  // // Handler für Änderungen im Passwortfeld
  // const handlePasswordChange = (event) => {
  //   setPassword(event.target.value);
  // };

  // // Handler für Änderungen im Passwortfeld
  // const handleEmailChange = (event) => {
  //   setEmail(event.target.value);
  // };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          minlength="2"
        />
      </label>

      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      {/* <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label> */}
      <button type="submit">Submit</button>
    </form>
  );
};
// TODO: benötigt? Code von marlinejohn
// LoginView.propTypes = {
//   onLoggedIn: PropTypes.func.isRequired,
// };
