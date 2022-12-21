import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Colors from 'common/Colors'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import API from 'services/api'
import Routes from 'common/Routes'
import { SvgIcon } from '@mui/material';
import { Add, CalendarTodayOutlined, ContentCopy, Delete, Edit, Email, LocationOn, MoreHoriz } from '@mui/icons-material';
import { BasicStyles } from 'common';
import ProfilePicture from 'modules/generic/card/profilePicture'
import Common from '../helper/Common';
import Button from 'components/increment/generic/form/Button'
import TaskModal from 'modules/generic/modal/TaskModal'
import BreadCrumbs from "modules/generic/breadcrumbs"
import TextArea from 'components/increment/generic/form/TextArea'
import Start from 'modules/generic/page/start'
import Helper from 'common/Helper';
const list = [{
    title: 'To do',
    payload: 'to_do',
    variable: 'todo',
    items: []
}, {
    title: 'Doing',
    payload: 'doing',
    variable: 'doing',
    items: []
}, {
    title: 'Done',
    payload: 'done',
    variable: 'done',
    items: []
}]


const cardActions = [{
    title: 'Edit task',
    icon: Edit,
    style: null
}, {
    title: 'Duplicate task',
    icon: ContentCopy,
    style: null
}, {
    title: 'Delete',
    icon: Delete,
    style: null
}]

const height = '60vh'
const headerHeight = '5vh'
const totalHeight = '70vh'

class Stack extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            list: list,
            selected: null,
            selectedUser: null,
            selectedCard: null,
            contracts: null,
            contractLoading: false,
            selectedContract: null,
            taskLoading: false,
            createTask: null,
            createTaskLoading: false
        };
    }

    componentDidMount() {
        const { user } = this.props.state;
        this.retrieveContracts()
    }

    manageList(data) {
        const { list } = this.state;
        const newList = list.map((item) => {
            return {
                ...item,
                items: data[item.variable]
            }
        })
        this.setState({
            list: newList
        })
    }

    manageNewTask(data) {
        const { list, createTask } = this.state;
        if (createTask) {
            let newList = list.map((item) => {
                if (item.variable == createTask.status) {
                    let newItems = item.items
                    const { user } = this.props.state;
                    newItems.unshift({
                        ...createTask,
                        id: data,
                        titleFlag: false,
                        descriptionFlag: false,
                        members: []
                    })
                    return {
                        ...item,
                        items: newItems
                    }
                }
                return item
            })
            this.setState({
                list: newList,
                createTask: null
            })
        }
    }

    onUpdate(params) {
        if (params == null) return null
        console.log({
            params
        })
        API.request(Routes.taskUpdate, {
            id: params.id,
            description: params.description
        }, response => {
            const { list } = this.state;
            const newList = list.map((item) => {
                let items = item.items
                if (params.status == item.variable) {
                    items = items.map((jItem) => {
                        if(jItem.id == params.id){
                            return {
                                ...jItem,
                                description: params.description
                            }
                        }
                        return jItem
                    })

                    return {
                        ...item,
                        items: items
                    }
                } else {
                    return item
                }
            })
            this.setState({
                list: newList,
                selectedCard: {
                    ...this.state.selectedCard,
                    description: params.description
                }
            })
        }, error => {
        })
    }

    onDelete(params) {
        if (params == null) return null
        console.log({
            params
        })
        API.request(Routes.taskDelete, {
            id: params.id
        }, response => {
            const { list } = this.state;
            const newList = list.map((item) => {
                let items = item.items
                if (params.status == item.variable) {
                    items = items.filter((jItem) => {
                        return jItem.id != params.id
                    })

                    return {
                        ...item,
                        items: items
                    }
                } else {
                    return item
                }
            })
            this.setState({
                list: newList,
                selectedCard: {
                    ...this.state.selectedCard,
                    deleted_at: 'Just now'
                }
            })
        }, error => {
        })
    }

    createTaskRequest() {
        const { createTask, selectedContract } = this.state;
        const { user } = this.props.state;
        if (user == null) return false
        if (createTask == null) return false
        if (selectedContract == null) return false
        this.setState({
            createTaskLoading: true
        })
        API.request(Routes.taskCreate, {
            account_id: user.id,
            title: createTask.title,
            category: createTask.status,
            status: createTask.status,
            payload: 'contracts',
            payload_value: selectedContract.id
        }, response => {
            this.setState({
                createTaskLoading: false
            })
            if (response.data) {
                this.manageNewTask(response.data)
            }
        }, error => {
            this.setState({
                createTaskLoading: false
            })
        })
    }

    retrieveContracts() {
        const { user } = this.props.state;
        if (user == null) return
        this.setState({
            contractLoading: true
        })
        API.request(Routes.contractRetrieveJobSummary, {
            condition: [{
                value: user.id,
                column: user.account_type.toLowerCase() == 'freelancer' ? 'freelancer' : 'account_id',
                clause: '='
            }]
        }, response => {
            this.setState({
                contractLoading: true
            })
            if (response && response.data && response.data.length > 0) {
                this.setState({
                    contracts: response.data,
                    selectedContract: response.data[0]
                })
                setTimeout(() => {
                    this.retrieveTasks(response.data[0])
                }, 1000)
            } else {
                this.setState({
                    contracts: null,
                    selectedContract: null
                })
            }
        }, error => {
            this.setState({
                contractLoading: true,
                selectedContract: null
            })
        })
    }

    sortTasks(data, status) {
        if (data) {
            let newData = data.filter((item) => {
                return item.status == status
            })
            return newData.map((item) => {
                const { user } = this.props.state;
                return {
                    ...item,
                    titleFlag: false,
                    descriptionFlag: false,
                }
            })
        } else {
            return data
        }
    }

    retrieveTasks(contract) {
        if (contract == null) {
            return null
        }
        this.setState({
            taskLoading: true
        })
        API.request(Routes.taskRetrieve, {
            condition: [{
                value: 'contracts',
                column: 'payload',
                clause: '='
            }, {
                value: contract.id,
                column: 'payload_value',
                clause: '='
            }]
        }, response => {
            this.setState({
                taskLoading: false
            })
            if (response && response.data) {
                this.setState({
                    data: response.data
                })
                this.manageList({
                    todo: this.sortTasks(response.data, 'todo'),
                    doing: this.sortTasks(response.data, 'doing'),
                    done: this.sortTasks(response.data, 'done')
                })
            }
        }, error => {
            this.setState({
                taskLoading: false
            })
        })
    }

    getSelectionData(data) {
        if (data) {
            let newData = data.map((item) => {
                return item.job && item.job.merchant ? item.job.title + ' - ' + item.job.merchant.name : ''
            })
            return newData
        }
        return []
    }

    listHeader(item) {
        return (
            <span style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: headerHeight
            }}>
                <h3>{item.title}</h3>
                <SvgIcon
                    component={Add}
                    style={{
                        fontSize: BasicStyles.iconSize
                    }}
                    className="cursor-hover"
                    onClick={() => {
                        this.setState({
                            createTask: {
                                status: item.variable
                            }
                        })
                    }}
                />
            </span>
        )
    }

    renderSelectedUser(account) {
        const { selectedContract } = this.state;
        return (
            <div style={{
                position: 'absolute',
                width: 250,
                height: 250,
                backgroundColor: Colors.white,
                borderRadius: 5,
                zIndex: 99999,
                boxShadow: '0px 3px 7px rgba(52, 71, 93, 0.14)',
                padding: 15
            }}>
                <div style={{
                    float: 'left',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center'
                }}>
                    <ProfilePicture
                        size={50}
                        iconSize={'lg'}
                        data={account.profile}
                    />
                    <b style={{
                        paddingLeft: 10
                    }}>
                        {
                            account.information && Common.getCompleteName(account.information)
                        }
                    </b>
                </div>
                <div style={{
                    float: 'left',
                    width: '100%',
                    marginTop: 20
                }}>
                    <p>
                        <SvgIcon component={Email} style={{
                            paddingRight: 5,
                            fontSize: BasicStyles.iconSize
                        }} />
                        {
                            account.email
                        }
                    </p>
                    <p>
                        <SvgIcon component={LocationOn} style={{
                            paddingRight: 5,
                            fontSize: BasicStyles.iconSize
                        }} />
                        {
                            account.email
                        }
                    </p>
                </div>


                <div style={{
                    float: 'left',
                    width: '100%',
                    marginTop: 20,
                    textAlign: 'center'
                }}>
                    <Button
                        title={'Send message'}
                        onClick={() => {
                            this.props.history.push('/messages/' + selectedContract.job.code)
                        }}
                        style={{
                            backgroundColor: 'transparent',
                            color: Colors.primary,
                            border: 'solid 1px ' + Colors.primary,
                            height: 40,
                            borderRadius: 20
                        }}
                        className="invert-color full-width-mobile mb-mobile-25"
                    />
                </div>
            </div>
        )
    }

    renderMenuDropDown(item) {
        return (
            <div style={{
                position: 'absolute',
                width: 150,
                height: 200,
                backgroundColor: Colors.white,
                borderRadius: 5,
                right: 0,
                top: 25,
                zIndex: 99999,
                boxShadow: '0px 3px 7px rgba(52, 71, 93, 0.14)'
            }}>
                {
                    cardActions.map(aItem => (
                        <span style={{
                            float: 'left',
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            ...aItem.style,
                            paddingTop: 2,
                            paddingBottom: 2,
                            paddingLeft: 5,
                            paddingRight: 5
                        }}
                            className="active-menu-on-hover"
                        >
                            <SvgIcon component={aItem.icon}
                                style={{
                                    fontSize: BasicStyles.iconSize,
                                    paddingRight: 5
                                }}
                            />
                            {
                                aItem.title
                            }
                        </span>
                    ))
                }
            </div>
        )
    }


    cardHeader(item) {
        const { selected } = this.state;
        return (
            <span style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                position: 'relative'
            }}>
                <b>{item.title}</b>
                <SvgIcon
                    component={MoreHoriz}
                    style={{
                        fontSize: BasicStyles.iconSize
                    }}
                    className="cursor-hover"
                    onClick={() => {
                        this.setState({
                            selected: selected && selected.id == item.id ? null : item
                        })
                    }}
                />

                {
                    selected && selected.id == item.id && this.renderMenuDropDown(item)
                }
            </span>
        )
    }

    renderCreateTask() {
        const { createTask, createTaskLoading } = this.state;
        return (
            <div
                style={{
                    ...style.card,
                    width: '96%'
                }}
                className="task-card"
                onClick={() => {
                }}
            >
                {
                    !createTaskLoading && (
                        <TextArea
                            placeholder={'Task title'}
                            type={"text"}
                            value={createTask.title}
                            onChange={(title) => {
                                this.setState({
                                    createTask: {
                                        ...this.state.createTask,
                                        title
                                    }
                                })
                            }}
                            style={{
                                height: 50,
                                marginTop: '10px',
                                marginBottom: '10px',
                                fontSize: BasicStyles.fontSize,
                                borderBottom: 'none'
                            }}
                            onEnter={() => {
                                this.createTaskRequest()
                            }}
                            enterEnable={true}
                            rows={5}
                            validation={{
                                type: 'text_without_space',
                                size: 0,
                                column: 'Message'
                            }}
                        />
                    )
                }
                {
                    createTaskLoading && (
                        <Skeleton height={50} />
                    )
                }

            </div>
        )
    }

    renderCard(data, list) {
        const { selectedUser, createTask } = this.state;
        const { user } = this.props.state;
        return (
            <div style={{
                width: '100%',
                float: 'left',
                height: height,
                overflowY: 'auto'
            }}>
                {
                    createTask && createTask.status == list.variable && this.renderCreateTask()
                }
                {
                    data.map((item, index) => (
                        <div
                            style={style.card}
                            className="task-card"
                            onClick={() => {
                                this.setState({
                                    selectedCard: item
                                })
                            }}
                        >
                            {
                                this.cardHeader(item)
                            }
                            <div style={{
                                width: '100%',
                                float: 'left',
                                whiteSpace: 'nowrap',
                                overFlow: 'hidden',
                                textOverflow: 'ellipsis'
                            }}>
                                <p>
                                    {
                                        item.description
                                    }
                                </p>
                            </div>

                            <div style={{
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                            }}>
                                {
                                    item.members && item.members.length > 0 && item.members.map((iMember) => (
                                        <div
                                            className="cursor-hover"
                                            onClick={() => {
                                                this.setState({
                                                    selectedUser: iMember && iMember.id == item.id ? null : iMember
                                                })
                                            }}
                                        >
                                            <ProfilePicture
                                                size={30}
                                                iconSize={'lg'}
                                                data={iMember ? iMember.profile : null}
                                            />
                                        </div>
                                    ))
                                }

                                {
                                    item.deadline && (
                                        <span style={{
                                            paddingLeft: 10
                                        }}>
                                            <b>{
                                                item.deadline
                                            }</b>
                                        </span>
                                    )
                                }
                                {
                                    item.deadline == null && (
                                        <SvgIcon
                                            component={CalendarTodayOutlined}
                                            style={{
                                                fontSize: BasicStyles.iconSize + 10,
                                                paddingLeft: 10
                                            }}
                                            className="cursor-hover"
                                        />
                                    )
                                }
                                {
                                    selectedUser && selectedUser.id == item.id && this.renderSelectedUser(selectedUser.account)
                                }

                            </div>
                        </div>
                    ))
                }
            </div>
        )
    }

    renderList() {
        const { list, taskLoading } = this.state;
        return (
            <div style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between'
            }}
                className="unset-flex-mobile"
            >
                {
                    list.map(item => (
                        <div style={style.list}
                            className="full-width-mobile mb-mobile-25"
                        >
                            <div style={{
                                width: '100%',
                                float: 'left',
                                height: headerHeight
                            }}>
                                {
                                    this.listHeader(item)
                                }
                            </div>

                            <div style={{
                                width: '100%',
                                float: 'left',
                                height: height
                            }}>

                                {
                                    !taskLoading && item && this.renderCard(item.items, item)
                                }
                                {
                                    taskLoading && (
                                        <Skeleton height={100} />
                                    )
                                }
                            </div>
                        </div>
                    ))
                }
            </div>
        )
    }

    render() {
        const { selectedCard, contracts, selectedContract } = this.state;
        return (
            <div style={{
                width: '100%',
                float: 'left',
            }}>
                <BreadCrumbs
                    title={'Tasks'}
                    page={'tasks'}
                    backIcon={true}
                    description="Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam."
                    style={{
                        borderBottomWidth: 0
                    }}
                    onSort={(index) => {
                        console.log(index)
                        this.setState({
                            selectedContract: contracts[index]
                        })
                        setTimeout(() => {
                            this.retrieveTasks(contracts[index])
                        }, 1000)
                    }}
                    value={this.getSelectionData(contracts)[0]}
                    data={this.getSelectionData(contracts)}
                />
                <div style={{
                    marginTop: 25,
                    width: '100%',
                    float: 'left'
                }}>
                    {
                        (contracts && selectedContract) && this.renderList()
                    }
                    {
                        contracts == null && (
                            <Start
                                title="You have no tasks as of the moment"
                                description={Helper.ACCOUNT_TYPE == 'Agent' ? 'Start looking for candidates' : 'Start applying for jobs'}
                            />
                        )
                    }
                </div>
                {
                    selectedCard && (
                        <TaskModal
                            show={true}
                            data={selectedCard}
                            title={selectedCard.title}
                            onDelete={(item) => {
                                this.onDelete(item)
                            }}
                            onUpdate={(item) => {
                                this.onUpdate(item)
                            }}
                            onCancel={() => {
                                this.setState({
                                    selectedCard: null
                                })
                            }}
                        />
                    )
                }


            </div>
        )
    }
}


const style = {
    list: {
        width: '32%',
        maxHeight: totalHeight,
        height: totalHeight,
        borderRadius: 12,
        border: 'solid 1px ' + Colors.activeGray,
        padding: 15
    },
    card: {
        width: '100%',
        minHeight: 100,
        borderRadius: 12,
        backgroundColor: Colors.activeGray,
        padding: 10,
        overflowY: 'hidden',
        marginBottom: 15
    }
}
const mapStateToProps = (state) => ({ state: state });

const mapDispatchToProps = (dispatch) => {
    const { actions } = require('reduxhandler');
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Stack));

