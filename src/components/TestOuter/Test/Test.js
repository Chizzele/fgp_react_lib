import React, { Component } from 'react';

export class Test extends Component {
  constructor(props){
    super(props);
    this.state = {
      isOpen: props.isOpen
    };
  }

  render() {
    return (
      <div>
          I am a test to see if I can have a component
      </div>
    )
  }
}

export default Test
