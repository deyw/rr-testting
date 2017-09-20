import React from 'react';
import { compose, setDisplayName, withStateHandlers, pure } from 'recompose';
import RecomposeComponent from './components/Recompose';

const HOC = compose(
  setDisplayName('AppComp'),
  withStateHandlers(
    ({
      userName: '',
    }),
    {
      setName: () => e => ({
        userName: e.target.value
      })
    }
  ),
  pure
)

const App = ({
  userName,
  setName
}) => (
  <div>
  <h1>App Component</h1>
  <input type="text" value={userName} placeholder="Enter your name" 
  onChange={setName} />
  <RecomposeComponent name={userName}/>
  </div>
)

export default HOC(App);