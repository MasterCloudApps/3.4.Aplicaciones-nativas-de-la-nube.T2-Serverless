import { connect } from 'react-redux';
import React, { Component } from 'react';

// Material-UI components
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import PrintIcon from '@material-ui/icons/Print';
import CircularProgress from '@material-ui/core/CircularProgress';

import { 
    getUsers,
    activateUser,
    printPdfUsers
} from '../actions/usersActions';

class UsersSection extends Component {
    componentDidMount() {
        this.props.getUsers();
    }

    renderUsers = () => {
        const { users, user } = this.props;
        const isAdmin = user.role === 'ADMIN';
        const loggedUserEmail = user.email;
        const usersRendered = users.map((user) => 
            <TableRow key={user.username}>
                <TableCell align="left">{user.email}</TableCell>
                <TableCell align="left">{user.activated}</TableCell>
                {isAdmin && loggedUserEmail !== user.email ? <TableCell align="left">
                            <button className="btn-activate-user" onClick={() => user.activated === 'PENDING' ? 
                                                                            this.props.activateUser(user.username, true) : 
                                                                            this.props.activateUser(user.username, false)}>
                {user.activated === 'PENDING' ? 'Activate user' : 'Deactivate user'}</button></TableCell> : <TableCell align="left"></TableCell>}
            </TableRow>
        );

        return (
            <React.Fragment>
                {usersRendered}
            </React.Fragment>
        );
    }

    renderLoadingButton = () => {
        if(this.props.loadingPdf) {
            return <CircularProgress color='inherit' size={24}/>;
        }
        return <PrintIcon/>;
    }

    render() {
        const { user } = this.props;
        const isAdmin = user.role === 'ADMIN';
        return (
            <Grid
                container
                direction="row"
                justify="center"
                className='main-section'
            >
                <CssBaseline/>
                <div className='main-container'>
                    <div className="users-content">
                        <div className='top-table'>
                            <h2 className='title-users-table'>Users registered</h2>
                            <button disabled={this.props.loadingPdf} className='btn-print-pdf' onClick={() => this.props.printPdfUsers()}>{this.renderLoadingButton()} <span className='title-btn-print-pdf'>Print pdf</span></button>
                        </div>
                        <TableContainer component={Paper}>
                            <Table className="usersTable" aria-label="User table">
                                <TableHead>
                                <TableRow>
                                    <TableCell align="left">Email</TableCell>
                                    <TableCell align="left">Activated</TableCell>
                                    {isAdmin ? <TableCell align="left">Options</TableCell> : []}
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.renderUsers()}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
            </Grid>
        );
    }
}

const mapStateToProps = (state /*, ownProps*/) => {
    return {
        users: state.users.users,
        loadingPdf: state.users.loadingPdf,
        user: state.login.user
    }
};

const mapDispatchToProps = {
    getUsers,
    activateUser,
    printPdfUsers
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UsersSection)