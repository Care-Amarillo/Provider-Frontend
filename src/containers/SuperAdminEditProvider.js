import { connect } from 'react-redux';
import SuperAdminEditProvider from "../components/SuperAdminProviders/SuperAdminEditProvider";

const mapStateToProps = (state) => {
    return {
        token: state.token,
        user: state.user,
    }
}



export default connect(mapStateToProps)(SuperAdminEditProvider);