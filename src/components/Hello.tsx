import * as React from 'react';

export interface HelloProps {
  compiler: string;
  framework: string;
}

export interface HelloState {
  test?: boolean;
}

export class Hello extends React.Component<HelloProps, HelloState> {
  constructor(props: HelloProps) {
    super(props);

    this.state = {
      test: false
    };

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.setState(state => ({
      test: !state.test
    }));
  }

  render(): JSX.Element {
    return (
      <div>
        <h1>Hello from { this.props.compiler } and { this.props.framework }!</h1>
        <button onClick={ this.handleClick}>BUTTON</button>
        <p>
          { this.state.test ? 'TRUE' : 'FALSE' }
        </p>
      </div>
    );
  }
}