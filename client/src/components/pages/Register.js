import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import { useState } from 'react';
import { API_URL } from '../../config';


const Register = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [status, setStatus] = useState(null); // null, success, serverError, clientError, loginInUse, loading

const handleSubmit = (e) => {
  e.preventDefault();

  const fd = new FormData();
  fd.append('login', login);
  fd.append('password', password);
  fd.append('phone', phone);
  fd.append('avatar', avatar);

  const options = {
    method: 'POST',
    body: fd,
  };
  setStatus('loading');
  fetch(`${API_URL}/auth/register`, options)
    .then(res => {
      if (res.status === 201) {
        setStatus('success');
      } else if (res.status === 400) {
        setStatus('clientError');
      } else if (res.status === 409) {
        setStatus('loginInUse');
      } else {
        setStatus('serverError');
      }
    })
    .catch(err => {
      console.log(err);
      setStatus('serverError');
    });
}

  return (
    <div>
      <Form className='col-12 col-sm-3 mx-auto' onSubmit={handleSubmit}>
        <h1 style={{ color: '#111947' }}>Sign up</h1>

        {/* ******* Alerts ******* */}
        {status === 'success' && (
          <Alert variant='success' >
            <Alert.Heading>Success</Alert.Heading>
            <p>You have successfully registered!</p>
            <p>You can now log in...</p>
          </Alert>
        )}

        {status === 'serverError' && (
          <Alert variant='danger' >
            <Alert.Heading>Something went wrong...</Alert.Heading>
            <p>Unexpected error... Try again!</p>
          </Alert>
        )}

        {status === 'clientError' && (
          <Alert variant='warning' >
            <Alert.Heading>Not enough data</Alert.Heading>
            <p>You have to fill all the fields</p>
          </Alert>
        )}

        {status === 'loginInUse' && (
          <Alert variant='danger' >
            <Alert.Heading>Login already in use...</Alert.Heading>
            <p>Plis, use other login.</p>
          </Alert>
        )}

        {/* ****** Spinner ******* */}
        
        {status === 'loading' && (
        <Spinner animation='border' variant='secondary' role='status'>
            <span className='visually-hidden'>Loading...</span>
        </Spinner>
        )}

        {/* ****** Form fields ******* */}
        <Form.Group className='mb-3' controlId='formLogin'>
          <Form.Label>Login</Form.Label>
          <Form.Control type='text' placeholder='Enter login' value={ login } onChange={ e => setLogin(e.target.value)}/>
        </Form.Group>

        <Form.Group className='mb-3' controlId='formPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control type='password' placeholder='Password' value={ password } onChange={ e => setPassword(e.target.value)}/>
        </Form.Group>

        <Form.Group className='mb-3' controlId='formPhone'>
          <Form.Label>Phone</Form.Label>
          <Form.Control type='tel' placeholder='Phone number' value={ phone } onChange={ e => setPhone(e.target.value)}/>
        </Form.Group>

        <Form.Group className='mb-3' controlId='formFile'>
          <Form.Label>Avatar</Form.Label>
          <Form.Control type='file' onChange={ e => setAvatar(e.target.files[0]) }/>
        </Form.Group>

        <Button variant='secondary' type='submit'>Join!</Button>
        
      </Form>
    </div>
    );
}
 
export default Register;