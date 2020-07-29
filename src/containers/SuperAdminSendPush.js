import { connect } from 'react-redux';
import SuperAdminSendPush from "../components/SuperAdminProviders/SuperAdminSendPush";

const mapStateToProps = (state) => {
    return {
        token: state.token,
        user: state.user,
    }
}



export default connect(mapStateToProps)(SuperAdminSendPush);