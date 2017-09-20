import React from 'react';
import {
  compose,
  setDisplayName,
  withStateHandlers,
  pure,
  lifecycle,
  toClass
} from 'recompose';

const HOC = compose(
  setDisplayName('AComponent'),
  withStateHandlers(
    (props) => ({
      _name: props.name,
      newName: ''
    }),
    {
      _setCurrentName: () => value => ({
        _name: value
      }),
      _setNewName: () => value => ({
        newName: value
      }),
    }
  ),
  lifecycle({
    componentWillReceiveProps(nextProps) {
      const { name, _setCurrentName } = this.props;
      if (name !== nextProps.name) {
        _setCurrentName(nextProps.name);
      }
    }
  }),
  toClass,
  pure
);

const RecomposeComponent = ({ _name, newName, _setNewName }) => (
  <div
    style={{
      border: '1px solid green',
      padding: '15px',
      position: 'relative',
      margin: '25px 0'
    }}
  >
    <small style={{ position: 'absolute', top: '0px', color: 'grey' }}>
      AComponent
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
    <button onClick={() => _setNewName(this.textInput.value)}>Change</button>
  </div>
);

export default HOC(RecomposeComponent);
