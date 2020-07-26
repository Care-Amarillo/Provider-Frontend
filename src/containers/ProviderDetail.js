import { connect } from 'react-redux';
import { setSWRegistration} from "../redux/actions";
import ProviderDetail from "../components/ProviderDetail/ProviderDetail";

const mapStateToProps = (state) => {
    return {
        swRegistration: state.swRegistration,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setSWRegistration: (value) => dispatch(setSWRegistration(value)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ProviderDetail);