import { connect } from 'react-redux';
import SuperProtectedRoute from '../components/SuperProtectedRoute';

const mapStateToProps = (state) => {
    return {
        token: state.token,
        user: state.user,
    }
}


export default connect(mapStateToProps)(SuperProtectedRoute);