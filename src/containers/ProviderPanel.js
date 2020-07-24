import { connect } from 'react-redux';
import ProviderPanel from "../components/Provider/ProviderPanel";

const mapStateToProps = (state) => {
    return {
        token: state.token,
        user: state.user,
    }
}


export default connect(mapStateToProps)(ProviderPanel);