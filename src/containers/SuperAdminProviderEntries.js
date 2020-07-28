import { connect } from 'react-redux';
import SuperAdminProviderEntries from "../components/SuperAdminProviders/SuperAdminProviderEntries";

const mapStateToProps = (state) => {
    return {
        token: state.token,
        user: state.user,
        provider: state.provider,
    }
}



export default connect(mapStateToProps)(SuperAdminProviderEntries);