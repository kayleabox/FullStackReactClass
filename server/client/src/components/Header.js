import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import StripeWrapper from './StripeWrapper';

class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return 'still deciding';
      case false:
        return <li><a href="/auth/google">Login</a></li>;
      default:
        return [
          <li key='1'><StripeWrapper /></li>,
          <li key='2' style={{margin: '0 0 0 10px'}}>Credits: {this.props.auth.credits}</li>,
          <li key='3'><a href="api/logout">Logout</a></li>
        ]
    }
  }

  render() {
    console.log(this.props);
    return (
      <nav>
        <div className="nav-wrapper">
          <Link 
          to={this.props.auth ? '/surveys' : '/'} 
          className="left brand-logo"
          >
            Email App
          </Link>
          <ul className="right">
            {this.renderContent()}
          </ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);