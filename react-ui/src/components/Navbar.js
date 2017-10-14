import React, { Component } from 'react';
import { Link } from 'react-router-dom'

// The Navbar creates links that can be used to navigate between routes.
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
            <a href="#" className="brand-logo">Turk System</a>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li className={this.state.homeActive}>
                <Link to='/'>Home</Link>
              </li>
              <li className={this.state.aboutActive}>
                <Link to='/about'>About</Link>
              </li>
              <li>
                <Link to='/stripe_example'>stripe_example</Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}
