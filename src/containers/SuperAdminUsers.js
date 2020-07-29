import { connect } from 'react-redux';
import SuperAdminUsers from "../components/SuperAdminUsers/SuperAdminUsers";

const mapStateToProps = (state) => {
    return {
        token: state.token,
        user: state.user,
    }
}



export default connect(mapStateToProps)(SuperAdminUsers);