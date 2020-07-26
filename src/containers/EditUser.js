import { connect } from 'react-redux';
import {setUser} from "../redux/actions";
import EditUser from "../components/User/EditUser";

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


export default connect(mapStateToProps, mapDispatchToProps)(EditUser);