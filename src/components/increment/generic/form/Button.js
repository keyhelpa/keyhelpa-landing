import React from 'react';
import {BasicStyles, Color} from 'common'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
export default class Button extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
	    message: props.children,
    };
  }

  render() {
    return (
        <button
	        style={
		        this.state.message === "OK"
			        ? {
				        ...BasicStyles.btn,
				        backgroundColor: Color.primary,
			        }
			        : { ...BasicStyles.btn, ...this.props.style }
	        }
            onClick={() => this.props.onClick()}
            className={this.props.className}
            >
            {
              this.props.iconLeft && (
                <span style={{
                  paddingRight: 20
                }}>
                  <FontAwesomeIcon icon={this.props.iconLeft} size="lg"/>
                </span>
              )
            }
            {this.props.title}
	          {this.state.message && (
		          <span
			          style={{
				          color: Color.white,
			          }}
		          >
                {this.state.message}
             </span>
	          )}
	        
            {this.props.iconRight && (
                <span style={{
                  paddingLeft: 20
                }}>
                  <FontAwesomeIcon icon={this.props.iconRight} size="lg"/>
                </span>
              )
            }
            {
              this.props.isLoading && (
                <span style={{
                  paddingLeft: 20
                }}>
                  <FontAwesomeIcon icon={faSpinner} size="lg" spin/>
                </span>
              )
            }
        </button>
    )
  }
}
