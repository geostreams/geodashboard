/*
 * @flow
 */

import { connect } from 'react-redux';
import DetailPageDownloadComponent from '../components/DetailPageDownload';

const mapStateToProps = (state) => {
    return {
        id: state.sensorDetail.id,
        api: state.backends.selected,
    }
};

const DetailPageDownload = connect(mapStateToProps)(DetailPageDownloadComponent);

export default DetailPageDownload;
