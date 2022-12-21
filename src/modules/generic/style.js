import Colors from 'common/Colors'
export default{
	headerIconSize: 32,
	iconSize: 25,
	largeIcon: 30,
	fontSize: 14,
	titleFontSize: 16,
	borderRadius: 15,
	borderBottomColor: 'solid 2px ' + Colors.gray,
	body: {
		width: '94%',
		marginRight: '3%',
		marginLeft: '3%',
		paddingLeft: 20,
		paddingRight: 20,
		paddingTop: 40,
		paddingBottom: 100,
		marginTop: 50,
		marginBottom: 50
	},
	formControl: {	
		width: '100%',
		height: 50,
		border: 'none',
		outline: 'none',
		paddingLeft: 10,
		paddingRight: 10,
		fontSize: 12,
		fontWeight: 'bold',
		color: Colors.gray,
		backgroundColor: 'transparent',
	},
	formControlContainer: {
		float: 'left',
		width: '100%',
		backgroundColor: 'transparent',
		borderBottomWidth: '3px',
		borderBottomColor: Colors.gray,
		borderBottomStyle: 'solid',
	},
	btn: {
		height: 50,
		borderRadius: 15,
		borderWidth: 0,
		minWidth: 120,
		overflowX: 'hidden',
		fontSize: 12,
		fontWeight: 'bold'
	}
}