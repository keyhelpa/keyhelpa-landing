import React from 'react';
import { BasicStyles } from 'common'
import Colors from 'common/Colors'
import Validator from 'services/validator'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Form } from 'react-bootstrap';
export default class SelectInput extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { value } = this.props;
        return (
            <div
                style={{
                    ...this.props.style
                }}
                className={this.props.className ? this.props.className : null}
            >
                <div style={{
                    borderBottom: '3px solid ' + Colors.formBottomBorderColor,
                    ...this.props.borderBottomStyle
                }}>
                    <select
                        style={{
                            ...BasicStyles.formControl,
                            backgroundColor: 'transparent',
                            ...this.props.selectStyle
                        }}
                        onChange={(e) => {
                            this.props.onChange(e.target.value)
                        }}
                    >
                        {
                            this.props.items.map((item, index) => (
                                <option value={index} selected={item.id == value.id}>{item.title}</option>
                            ))
                        }
                    </select>
                </div>
            </div>
        )
    }
}