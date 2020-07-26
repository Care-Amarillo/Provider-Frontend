import { connect } from 'react-redux';
import {setUser} from "../redux/actions";
import AuditEntries from "../components/AuditEntries/AuditEntries";

const mapStateToProps = (state) => {
    return {
        token: state.token,
        user: state.user,
    }
}



export default connect(mapStateToProps)(AuditEntries);