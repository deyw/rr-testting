import React from 'react';

import compose from 'recompact/compose'
import setDisplayName from 'recompact/setDisplayName'
import withState from 'recompact/withState'
import withHandlers from 'recompact/withHandlers'
import lifecycle from 'recompact/lifecycle'
import toClass from 'recompact/toClass'
import pure from 'recompact/pure'

const HOC = compose(
  setDisplayName('RecompactComponent'),
  withState('_name', 'setCurrentName', props => props.name),
  withState('newName', 'setNewName', ''),
  withHandlers({
    _onSetCurrentName: ({ setCurrentName }) => (val) => {
      setCurrentName(val);
    },
    _onSetNewName: ({ setNewName }) => (val) => {
      setNewName(val)
    }
  }),
  lifecycle({
    componentWillReceiveProps(nextProps) {
      const { name, _onSetCurrentName } = this.props;
      if (name !== nextProps.name) {
        _onSetCurrentName(nextProps.name);
      }
    }
  }),
  toClass,
  pure
);

const RecompactComponent = ({ _name, newName, _onSetNewName }) => (
  <div
    style={{
      border: '1px solid green',
      padding: '15px',
      position: 'relative',
      margin: '25px 0'
    }}
  >
    <small style={{ position: 'absolute', top: '0px', color: 'grey' }}>
      Recompact
    </small>
    CurrentName: {_name}
    <br />
    NewName: {newName}
    <br />
    <br />
    <input
      type="text"
      placeholder="Change name"
      ref={input => {
        this.textInput = input;
      }}
    />
    <button onClick={() => _onSetNewName(this.textInput.value)}>Change</button>
  </div>
);

export default HOC(RecompactComponent);
