import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../../index.scss'; // Import CSS file for LoginView and SignupView

export const SignupView = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday,
    };

    fetch('https://kraftflix-api-d019e99d109c.herokuapp.com/users', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      if (response.ok) {
        alert('Signup successful');
        window.location.reload();
      } else {
        alert('Signup failed');
      }
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2>Signup</h2>
      <Form.Group controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          minLength="3"
        />
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="formEmail">
        <Form.Label>Email:</Form.Label>
        <Form.Control
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group controlId="formBirthday">
        <Form.Label>Birthday:</Form.Label>
        <Form.Control
          type="date"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          required
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

// <div className="auth-container">
//   <h2 className="auth-heading">Signup</h2>
//   <form className="auth-form" onSubmit={handleSubmit}>
//     <label className="auth-label">
//       Username:
//       <input
//         type="text"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//         required
//         minLength="3"
//         className="auth-input"
//       />
//     </label>
//     <label className="auth-label">
//       Password:
//       <input
//         type="password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         required
//         className="auth-input"
//       />
//     </label>
//     <label className="auth-label">
//       Email:
//       <input
//         type="email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         required
//         className="auth-input"
//       />
//     </label>
//     <label className="auth-label">
//       Birthday:
//       <input
//         type="date"
//         value={birthday}
//         onChange={(e) => setBirthday(e.target.value)}
//         required
//         className="auth-input"
//       />
//     </label>
//     <button type="submit" className="auth-button">
//       Submit
//     </button>
//   </form>
// </div>
