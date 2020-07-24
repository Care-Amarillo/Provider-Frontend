import { connect } from 'react-redux';
import EditProvider from "../components/Provider/EditProvider";
import {setProvider} from "../redux/actions";

const mapStateToProps = (state) => {
    return {
        token: state.token,
        user: state.user,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setProvider: (provider) => dispatch(setProvider(provider)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(EditProvider);