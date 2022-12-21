import { Color } from 'common';

import { faCog, faSignOutAlt, faSlidersH } from '@fortawesome/free-solid-svg-icons'
export default {
	menu: [{
		title: 'Settings',
		icon: faSlidersH,
		route: '/settings'
	}, {
		title: 'Logout',
		route: '/logout',
		icon: faSignOutAlt
	}],
	menuNotVerified: [{
		title: 'Logout',
		route: '/logout',
		icon: faSignOutAlt
	}],
	container: {
		backgroundColor: Color.white,
		position: 'fixed',
		right: 0,
		top: 70,
		width: 250,
		minHeight: '120px',
		overflowY: 'hidden',
		borderBottomLeftRadius: '5px',
		borderBottomRightRadius: '5px',
		paddingLeft: 1,
		zIndex: 99999,
		boxShadow: '0px 3px 7px rgba(52, 71, 93, 0.14)',
		borderRadius: 4
	},
	sub_container: {
		color: 'white',
		cursor: 'pointer',
		float: 'left',
		width: '100%',
	},
	content: {
		color: 'white',
		width: '100%',
		float: 'left',
		paddingLeft: '10px'
	}
}