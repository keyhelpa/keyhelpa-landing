import React from 'react';
import { BasicStyles } from 'common'
import Colors from 'common/Colors'
import { Pagination } from 'react-bootstrap'
export default class Stack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      last: null,
      next: null
    }
  }

  componentDidMount() {
    const { pages, selected } = this.props;
    let last = pages[pages.length - 1]
    let next = pages[pages.length - 1]
    if(last > (selected + 1)){
      this.setState({
        last 
      })
    }
    if(next > (selected)){
      this.setState({
        next: next 
      })
    }
  }

  onPrev() {
    const { selected } = this.props;
    if (selected > 0) {
      this.props.onRetrieve(selected - 1)
    }
  }

  onNext() {
    const { selected } = this.props;
    const { next } = this.state;

    if (selected < next) {
      this.props.onRetrieve(selected + 1)
    }
  }


  render() {
    const { pages, selected } = this.props;
    const { last, next } = this.state;
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'right'
      }}>
        <Pagination size="lg">
          {
            selected > 2 && (
              <Pagination.First
                onClick={() => this.props.onRetrieve(0)} />
            )}
          {selected > 1 && (
            <Pagination.Prev
              onClick={() => this.onPrev()} />
          )
          }
          {
            pages && pages.map((item) => (
              <Pagination.Item
                active={item === selected ? true : false}
                onClick={() => this.props.onRetrieve(item)}
              >{item}</Pagination.Item>
            ))
          }
          {
            next > selected && (
              <Pagination.Next
              onClick={() => this.onNext()} />
            )
          }
          
          {
            last && (
              < Pagination.Last
                onClick={() => this.props.onRetrieve(last)} />
            )
          }
          </Pagination>
      </div>
    )
  }
}
