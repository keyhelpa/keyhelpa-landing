import React from 'react';
import { BasicStyles } from 'common'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDotCircle, faCircle, faToggleOn, faToggleOff } from '@fortawesome/free-solid-svg-icons'
import Colors from 'common/Colors'
import { Table } from 'react-bootstrap'
import Ratings from 'modules/generic/form/Rating'
import Skeleton from 'react-loading-skeleton';
import { withRouter } from 'react-router-dom';
class Stack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  renderToggle(item, value) {
    return (
      <td>
        <FontAwesomeIcon
          icon={value ? faToggleOn : faToggleOff}
          size={"2x"}
          color={value ? Colors.primary : Colors.danger}
          onClick={() => {
            this.props.onToggle(item)
          }}
        />
      </td>
    )
  }

  renderText(header, value) {
    let style = header.style ? header.style : null
    return (
      <td style={{
        ...style
      }}>
        {value}
      </td>
    )
  }

  renderRedirect(header, item) {
    let style = header.style ? header.style : null
    return (
      <td style={{
        ...style
      }}
        className="href-link"
        onClick={() => {
          this.props.history.push(header.route + item[header.route_params])
        }}
      >
        {item[header.variable]}
      </td>
    )
  }

  renderDocument(header, item) {
    let style = header.style ? header.style : null
    return (
      <td style={{
        ...style
      }}
        className="href-link"
        onClick={() => {
          this.props.onViewModal(item)
        }}
      >
        {item[header.variable]}
      </td>
    )
  }

  renderModal(header, item) {
    let style = header.style ? header.style : null
    return (
      <td style={{
        ...style
      }}
        className="href-link"
        onClick={() => {
          this.props.onViewModal(item)
        }}
      >
        {item[header.variable]}
      </td>
    )
  }

  renderActions(header, item) {
    let style = header.style ? header.style : null
    return (
      <td style={{
        ...style
      }}
      >
        {
          header.options && header.options.map((oItem) => {
            return (item.edit_flag || (oItem.title != 'Edit')) ? (
              <span
                style={{
                  paddingRight: '15px'
                }}
                className="href-link"
                onClick={() => {
                  if (oItem.action == 'redirect') {
                    this.props.history.push(oItem.route + item[oItem.route_params])
                  } else {
                    this.props.onClick(oItem, item)
                  }
                }}
              >{oItem.title}</span>
            ) : null
          })
        }
      </td>
    )
  }


  renderRatings(ratings) {
    return (
      <td>
        <Ratings value={ratings} />
      </td>
    )
  }

  renderIndex(item, index, hItem, hIndex) {
    switch (hItem.type.toLowerCase()) {
      case 'text': return (this.renderText(hItem, item[hItem.variable]));
      case 'ratings': return this.renderRatings(item[hItem.variable]);
      case 'toggle_button': return this.renderToggle(item, item[hItem.variable]);
      case 'redirect': return this.renderRedirect(hItem, item);
      case 'action': return this.renderActions(hItem, item);
      case 'document': return this.renderDocument(hItem, item);
      case 'modal': return this.renderModal(hItem, item);
    }
  }

  render() {
    const { header, data, isLoading } = this.props;
    return (
      <div style={{
        width: '100%',
        float: 'left'
      }}>
        <Table style={{
          color: Colors.gray,
          fontWeight: 'bold'
        }}>
          <thead style={{
            borderColor: 'transparent'
          }}>
            <tr style={{
            }}>
              {
                header && header.map((item) => (
                  <th style={{
                    color: Colors.gray
                  }}>{item.title}</th>
                ))
              }
            </tr>
          </thead>
          <tbody style={{
            borderTopColor: Colors.activeGray,
          }}>
            {
              (!isLoading && data) && data.map((item, index) => (
                <tr>
                  {
                    header && header.map((hItem, hIndex) => (
                      this.renderIndex(item, index, hItem, hIndex)
                    ))
                  }
                </tr>
              ))
            }
            {
              isLoading && [1, 2, 3, 4, 5].map((item) => (
                <tr>
                  <td colSpan={header.length}>
                    <Skeleton
                      height={50}
                      style={{
                        backgroundColor: Colors.activeGray
                      }}
                    />
                  </td>
                </tr>
              ))
            }
            {
              (!isLoading && (data == null || (data && data.length == 0))) && (
                <tr>
                  <td colSpan={header.length}
                    style={{
                      textAlign: 'center',
                      color: Colors.danger
                    }}
                  >
                    No results
                  </td>
                </tr>
              )
            }
          </tbody>
        </Table>


      </div>
    )
  }
}

export default withRouter(Stack);