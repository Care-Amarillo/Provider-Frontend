import { connect } from 'react-redux';
import ProviderEntries from "../components/ProviderEntries/ProviderEntries";

const mapStateToProps = (state) => {
    return {
        token: state.token,
        user: state.user,
        provider: state.provider,
    }
}



export default connect(mapStateToProps)(ProviderEntries);