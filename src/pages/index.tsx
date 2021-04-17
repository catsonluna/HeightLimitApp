import "./App.css"
import ListGroup from 'react-bootstrap/ListGroup'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios';
import { useEffect, useState } from "react";

const fetchPinkuluData = (): Promise<any> => {
  return axios.get('https://api.pinkulu.com/HeightLimitMod/HeightLimitApp')
  .then(({data}) => {
    console.log(data)
    return JSON.stringify(data)
  })
  .catch(err => {
    console.error(err);
  });}

export default function MainPage() {
  const [ msg, setMsg ] = useState('')
  const [ title, setTitle ] = useState('')

  useEffect(() => {
    fetchPinkuluData().then(data=> {
      var obj = JSON.parse(data);
      setMsg(obj.announcement || 'error')
    })
  }, [])
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
    <div className="news">
      <div className="announcement">
    <h1>announcement</h1>
    <p>{msg}</p>
    </div>
    <div className="Social">
    </div>
    </div>
        </div>
  </div>
  );
}