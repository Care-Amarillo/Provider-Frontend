import { connect } from 'react-redux';
import SuperAdminProviders from "../components/SuperAdminProviders/SuperAdminProviders";

const mapStateToProps = (state) => {
    return {
        token: state.token,
        user: state.user,
    }
}



export default connect(mapStateToProps)(SuperAdminProviders);