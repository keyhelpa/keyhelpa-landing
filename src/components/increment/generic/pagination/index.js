import React from 'react';
import { BasicStyles } from 'common'
import Colors from 'common/Colors'
import { Pagination } from 'react-bootstrap'
export default class Stack extends React.Component {
  constructor(props) {
    super(props);
  }

  onPrev() {
    const { selected } = this.props;
    if (selected > 0) {
      this.props.onRetrieve(selected - 1)
    }
  }

  onNext() {
    const { selected, last } = this.props;
    if (selected < last) {
      this.props.onRetrieve(selected + 1)
    }
  }


  render() {
    const { pages, selected } = this.props;
    console.log({
      offset: this.props.offset
    })
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'right'
      }}>
        <Pagination size="lg">
          {
            this.props.first && (
              <Pagination.First
                onClick={() => this.props.onRetrieve(0)} />
            )
          }

          {
            this.props.prev && (
              <Pagination.Prev
                onClick={() => this.onPrev()} />
            )
          }

          {
            [-2, -1, 0, 1, 2].map((item) => (
              <Pagination.Item
                onClick={() => this.props.onRetrieve(item - 1)}
                active={this.props.offset == (item + this.props.offset)}
              >{this.props.offset && this.props.offset > 2 ? (this.props.offset + item): item + 3}</Pagination.Item>
            ))
          }
          {
            this.props.next && (
              <Pagination.Next
                onClick={() => this.onNext()} />
            )
          }

          {
            this.props.last && (
              <Pagination.Last
                onClick={() => this.props.onRetrieve(this.props.last)} />
            )
          }
        </Pagination>
      </div>
    )
  }
}
