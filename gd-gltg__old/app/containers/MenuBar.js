/*
 * @flow
 */


import {connect} from 'react-redux';
import MenuBarComponent from '../components/MenuBar';

const mapStateToProps = (state) => {

    return {
        header_title: state.backends.title,
        subtitle: state.backends.subtitle
    }
};

const MenuBar = connect(mapStateToProps)(MenuBarComponent);

export default MenuBar;
