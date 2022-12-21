import Color from 'common/Colors';
import LandingImage from 'assets/img/landing_banner.png'
export default {
  mainContainer: {
    width: '100%',
    marginBottom: 200,
    backgroundImage: `url(${LandingImage})`,
    backgroundSize: '100% auto',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh'
  },
  rightContainer: {
    background: Color.white,
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
  leftContainer: {
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
