import * as React from "react";
import "./App.css"

import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import ListGroup from 'react-bootstrap/ListGroup'
import 'bootstrap/dist/css/bootstrap.min.css'

const {useState} = React;

export default function App() {
  const [count, setCounter] = useState(0);

  return (
    <html>
    <meta charSet="UTF-8"/>

    <head>
        <title>Height Limit App</title>
    </head>

    <body className="App-header">

      <ListGroup className="position-absolute top-0 start-0">
        <ListGroup.Item>Home Page</ListGroup.Item>
        <ListGroup.Item>Current Map</ListGroup.Item>
        <ListGroup.Item>All Maps</ListGroup.Item>
        <ListGroup.Item>Statstics</ListGroup.Item>
        <ListGroup.Item>Settings</ListGroup.Item>
      </ListGroup>

      <div className="App">
        <Alert>
          {count}
        </Alert>
        <Button onClick={() => {
          setCounter(count + 1)
        }}>Click Me!</Button>
      </div>
    </body>
    </html>
  );
}
