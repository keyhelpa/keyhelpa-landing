import Colors from 'common/Colors';
import LandingImage from 'assets/img/landing_banner.png'
export default {
  mainContainer: {
    width: '80%',
    float: 'left',
    marginLeft: '10%',
    marginRight: '10%',
    marginTop: '10%',
    paddingLeft: 20,
    paddingRight: 20,
    minHeight: '100vh'
  },
  leftContainer:{
    width: '32%',
    height: '100%',
    float: 'left',
    textAlign: 'center',
    backgroundColor: '#E62D7E87',
    minHeight: '100vh'
  },
  rightContainer: {
    width: '68%',
    float: 'left',
    paddingLeft: 60,
    paddingRight: 60,
    // minHeight: '100vh'
  },
  rightContainerWelcome: {
    width: '90%',
    float: 'left',
    paddingLeft: 60,
    paddingRight: 60,
    // minHeight: '100vh'
  },
  button: {
    float: 'left',
    backgroundColor: Colors.primary,
    color: Colors.white,
    paddingLeft: 40,
    paddingRight: 40,
    marginTop: 10,
    marginRight: 20
  },
  image: {
    width: '100%',
    height: 'auto',
    position: 'absolute',
    marginRight: '50%',
    border: '2px solid red'
  },
  cardStyle: {
    background: Colors.white,
    borderRadius: 15,
    minHeight: 200,
    overflowY: 'auto',
    width: '35%',
    float: 'center',
    paddingLeft: 50,
    paddingRight: 50,
    marginLeft: '32%',
    marginTop: 100
  },
  pageWithBackground: {
    width: '100%',
    marginBottom: 200,
    backgroundImage: `url(${LandingImage})`,
    backgroundSize: '100% auto',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh'
  },
  leftPage: {
    minHeight: 200,
    overflowY: 'auto',
    width: '60%',
    float: 'left',
    paddingLeft: 50,
    paddingRight: '30%',
    marginLeft: '5%',
    marginTop: 100,
    display: 'none'
  }
}