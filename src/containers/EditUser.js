import { connect } from 'react-redux';
import EditProvider from "../components/Provider/EditProvider";
import {setUser} from "../redux/actions";

const mapStateToProps = (state) => {
    return {
        token: state.token,
        user: state.user,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setUser: (user) => dispatch(setUser(user)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(EditProvider);