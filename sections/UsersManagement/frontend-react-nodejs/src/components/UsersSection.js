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

import TopNavigator from '../components/TopNavigator';

import { 
    getUsers,
    activateUser 
} from '../actions/usersActions';

class UsersSection extends Component {
    componentDidMount() {
        this.props.getUsers();
    }

    renderUsers = () => {
        const { users, user } = this.props;
        const isAdmin = user.role === 'ADMIN';
        const usersRendered = users.map((user, key) => 
            <TableRow key={key}>
                <TableCell align="left">{user.email}</TableCell>
                <TableCell align="left">{user.firstName}</TableCell>
                <TableCell align="left">{user.lastName}</TableCell>
                <TableCell align="left">{user.role}</TableCell>
                <TableCell align="left">{user.activated}</TableCell>
                {isAdmin && user.role !== 'ADMIN' ? <TableCell align="left">
                            <button className="btn-activate-user" onClick={() => user.activated === 'PENDING' ? 
                                                                            this.props.activateUser(user.email, true) : 
                                                                            this.props.activateUser(user.email, false)}>
                {user.activated === 'PENDING' ? 'Activate user' : 'Deactivate user'}</button></TableCell> : <TableCell align="left"></TableCell>}
            </TableRow>
        );

        return (
            <React.Fragment>
                {usersRendered}
            </React.Fragment>
        );
    }

    render() {
        const { user } = this.props;
        const isAdmin = user.role === 'ADMIN';
        return (
            <Grid
                container
                direction="row"
                justify="center"
                //alignItems="center"
                className='main-section'
            >
                <CssBaseline/>
                <div className='main-container'>
                    <TopNavigator/>
                    <div className="users-content">
                        <h2>Users registered</h2>
                        <TableContainer component={Paper}>
                            <Table className="usersTable" aria-label="User table">
                                <TableHead>
                                <TableRow>
                                    <TableCell align="left">Email</TableCell>
                                    <TableCell align="left">First Name</TableCell>
                                    <TableCell align="left">Last Name</TableCell>
                                    <TableCell align="left">Role</TableCell>
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
        user: state.login.user
    }
};

const mapDispatchToProps = {
    getUsers,
    activateUser
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UsersSection)