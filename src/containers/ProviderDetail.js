import { connect } from 'react-redux';
import {setUser} from "../redux/actions";
import ProviderDetail from "../components/ProviderDetail/ProviderDetail";

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


export default connect(mapStateToProps, mapDispatchToProps)(ProviderDetail);