import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'

function RouteWrapper({
  component: Component,
  isPrivate,
  ...rest
}){
  return <Route {...rest} component={Component}/>
}

RouteWrapper.prototype = {
  isPrivate: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired
}

RouteWrapper.defaultProps = {
  isPrivate: false,
}

const mapStateToProps = (state) => ({state: state});
const mapDispatchToProps = (dispatch) => {
  const {action} = require('reduxHandler')
  return {}
}
export default connect(mapStateToProps, mapDispatchToProps)(RouteWrapper);