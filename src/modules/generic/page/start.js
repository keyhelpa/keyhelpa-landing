import React from 'react';
import Colors from 'common/Colors'
import Background from 'assets/img/proposals.png'
import Image from 'react-bootstrap/Image'
export default class Stack extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '500px'
            }}>
                <div style={{
                    width: '100%',
                    textAlign: 'center'
                }}>

                    {
                        <Image src={Background} style={{
                            width: 300,
                            height: 200,
                            marginTop: 50
                        }} />
                    }
                    <p>{this.props.title}</p>
                    <p>{this.props.description}</p>
                </div>
            </div>
        )
    }
}
