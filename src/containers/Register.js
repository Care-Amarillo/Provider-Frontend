import { connect } from 'react-redux';
import { setToken} from '../redux/actions';
import Register from "../components/Register/Register";

const mapStateToProps = (state) => {
    return {
        token: state.token,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setToken: (submitEvent) => dispatch(setToken(submitEvent)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);