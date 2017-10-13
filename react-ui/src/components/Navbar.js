import React, { Component } from 'react';
// import $ from 'jquery';

export default class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      homeActive: 'active',
      aboutActive: '',
    };
  }

  componentDidMount() {
  }

  homeClicked = () => {
    this.setState({
      homeActive: 'active',
      aboutActive: '',
    });
  }

  aboutClicked = () => {
    this.setState({
      homeActive: '',
      aboutActive: 'active',
    });
  }

  render() {
    return (
      <div className="navbar-fixed">
        <nav>
          <div className="nav-wrapper container">
            <a href="#" className="brand-logo">Flying Lanterns</a>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li className={this.state.homeActive}>
                <a href="" onClick={this.homeClicked}>Home</a>
              </li>
              <li className={this.state.aboutActive}>
                <a href="" onClick={this.aboutClicked}>About</a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}
