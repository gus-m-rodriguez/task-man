import {useContext} from 'react';
import { authContext } from '../context/AuthContext';


function HomePage() {
  const data = useContext(authContext);

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <p>This is the home page of our application.</p>
    </div>
  )
}

export default HomePage
