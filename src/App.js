import React from 'react';
import { compose, setDisplayName, withStateHandlers, pure } from 'recompose';
import RecompactComponent from './components/Recompact';

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
  <RecompactComponent name={userName}/>
  </div>
)

export default HOC(App);