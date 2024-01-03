import { Link } from 'react-router-dom';
import './Created.css'

function Created() {

  return (
      <div>
        <h1>Created</h1>
        <div className="button-container">
        <Link to="/form">
          <button className="nav-button">Create Other Driver</button>
        </Link>
        <Link to="/home">
          <button className="nav-button">Search a Driver</button>
        </Link>
      </div>
      </div>
  )
}

export default Created
