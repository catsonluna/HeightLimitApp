import "./App.css"

import ListGroup from 'react-bootstrap/ListGroup'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function Settings() {
  return (
    <div className="App">
        <div className="App-header">
    <ListGroup className="position-absolute bottom-0 start-0">
    <ListGroup.Item action href="/">
        Home Page
      </ListGroup.Item>
      <ListGroup.Item action href="/currentmap">
        Current Map
      </ListGroup.Item>
      <ListGroup.Item action href="/allmaps">
        All Maps
      </ListGroup.Item>
      <ListGroup.Item action href="/stats">
        Statistics
      </ListGroup.Item>
      <ListGroup.Item action href="/settings">
        Settings
      </ListGroup.Item>
    </ListGroup>
    <p>This Is The Stats Page</p>
    </div>
  </div>
  );
  }
