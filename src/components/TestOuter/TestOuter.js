import React, { Component } from 'react';
import Test from './Test/Test'

export class TestOuter extends Component {
  constructor(props){
    super(props);
    this.state = {
      hello: true
    };
  }

  render() {
    return (
      <div>
          I am a test to see if I can have a component wrapping a component underneath me should be a Component
          <Test />

      </div>
    )
  }
}

export default TestOuter
