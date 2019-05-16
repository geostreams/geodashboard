/*
 * @flow
 */

import React, {Component} from 'react';
import {connect} from "react-redux";
import {Link} from 'react-router';
import Menu from '../containers/MenuBar';
import DetailTabs from '../components/DetailTabs';
import Spinner from '../components/Spinner';
import DetailContents from '../containers/DetailContents';
import {getMobileSizeMax, getSourceName, getMobileExplorePath, getColor} from "../utils/getConfig";
import {resetDetailPage} from '../actions';
import type {Dispatch} from '../utils/flowtype'
import {Row, Col} from 'react-flexbox-grid';
import styles from '../styles/main.css';
import {Icon} from 'react-mdc-web/lib';


class Detail extends Component {
    constructor(props: Object) {
        super(props);
        this.state = {
            category_mappings: {},
            sensor: {},
            isPageReady: false,
            showError: false
        };
        (this: any).setUpCategoryMappings = this.setUpCategoryMappings.bind(this);
    }

    state: {
        category_mappings: Object,
        sensor: Object,
        isPageReady: boolean,
        showError: boolean
    };

    componentWillMount() {
        this.setUpCategoryMappings(this.props);
    }

    componentWillReceiveProps(newProps) {
        this.setUpCategoryMappings(newProps);
    }

    componentWillUnmount() {
        this.props.cleanPreviousSelection();
    }

    setUpCategoryMappings(newProps) {
        const sensor = newProps.sensors.find(x => x.name === newProps.params.name);
        if (sensor) {
            const {parameters, categories, mappings} = newProps.parameters;
            let categories_mapping = {};
            sensor.parameters.map(parameter_name => {
                const parameter = parameters.find(parameter => parameter.name === parameter_name);
                if (parameter) {
                    const mapped_categories = mappings.filter(mapping => mapping.parameter_id === parameter.id);
                    mapped_categories.map(mapping => {
                        const category = categories.find(c => c.id === mapping.category_id);
                        if (Object.keys(categories_mapping).indexOf(category.name) === -1) {
                            categories_mapping[category.name] = {
                                "type": category.detail_type,
                                "parameters": [parameter]
                            }
                        } else {
                            categories_mapping[category.name]["parameters"].push(parameter)
                        }
                    })
                }
            });

            this.setState({category_mappings: categories_mapping, sensor: sensor});
        }
    }

    render() {
        if (Object.keys(this.state.category_mappings).length === 0) {
            let contents;
            if (this.props.parameters.failed) {
                contents = (
                    <span>
                        <h1>{this.props.params.name}</h1>
                        <div className={[styles.error_text, styles.contentscenter].join(" ")}>Error retrieving parameter
                            Configuration</div>
                    </span>)
            }
            else if (this.props.selected_detail !== this.props.params.name) {
                contents = (
                    <span>
                    <h1 style={{backgroundColor: 'grey'}}>
                        <Row>
                            <Col md={11} className={styles.detail_header}>
                                <span className={styles.detail_title}>
                                    {this.props.params.name}
                                </span>
                            </Col>
                            <Col md={1} className={styles.detail_header}>
                                <span className={styles.close_detail}>
                                <Link href={"/#explore/all"}> <Icon name="close"/></Link>
                                </span>
                            </Col>
                        </Row>
                    </h1>
                    <div className={[styles.error_text, styles.contentscenter].join(" ")}>No Parameters Available</div>
                    </span>
                );
            } else {
                contents = (<span><h1>{this.props.params.name}</h1><Spinner/></span>);
            }
            return (
                <div>
                    <Menu selected='explore'/>
                    {contents}
                </div>
            )
        }

        let display_tabs = '';
        const category_mappings = this.state.category_mappings;
        let selected_category = Object.keys(category_mappings).indexOf(this.props.params.category) > 0 ? this.props.params.category :
            Object.keys(category_mappings)[0];
        // TODO: Show a loading screen while getting the sensor if categories_mapping is empty
        if (screen.width > getMobileSizeMax()) {
            display_tabs = <DetailTabs sensorName={this.props.params.name} categories={this.state.category_mappings}
                                       selected={selected_category}/>
        }

        let title = "";

        if (this.state.sensor) {
            const sensor = this.state.sensor;
            const source_name = getSourceName(sensor.properties.type);
            if (screen.width <= getMobileSizeMax()) {
                title = (<h1><Link
                    href={getMobileExplorePath()}>Explore Mobile</Link><Icon name="chevron_right"/> {sensor.name}
                </h1>);
            } else {
                const background_color = getColor(sensor.properties.type.id);
                title = (
                    <h1 style={{backgroundColor: background_color}}>
                        <Row>
                            <Col md={11} className={styles.detail_header}>
                                <span className={styles.detail_title}>
                                    {sensor.properties.popupContent} - {source_name}
                                </span>
                            </Col>
                            <Col md={1} className={styles.detail_header}>
                                <span className={styles.close_detail}>
                                <Link href={"/#explore/all"}> <Icon name="close"/></Link>
                                </span>
                            </Col>
                        </Row>
                    </h1>
                );
            }

        }

        // Ensure the URL Parameters data is good data
        let not_found = false;
        let params_list = '';
        // Get the list of all available Parameters
        let all_parameters = this.state.category_mappings[selected_category]["parameters"].map(parameter => {
            return parameter.name
        });
        // Check if all the URL Params provided exist
        if (this.props.params.parameters_list) {
            not_found = this.props.params.parameters_list.split(',')
                .some(r => all_parameters.indexOf(r) === -1);
        }
        // Use the URL Params if they all exist
        if (not_found === false) {
            params_list = this.props.params.parameters_list;
        }

        let page_content = (
            <div>
                <Menu selected='explore'/>
                {title}
                {display_tabs}
                <div>
                    <DetailContents
                        parameters_list={params_list}
                        start_date={this.props.params.start_date}
                        end_date={this.props.params.end_date}
                        sensor={this.state.sensor}
                        category_parameters={this.state.category_mappings[selected_category]["parameters"]}
                        chart_type={this.state.category_mappings[selected_category]["type"]}
                    />
                </div>
            </div>
        );

        return (page_content);

    }
}

const mapStateToProps = (state) => {
    return {
        sensors: state.sensors.data,
        parameters: state.parameters,
        selected_detail: state.sensorDetail.name
    }
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        cleanPreviousSelection: () => {
            dispatch(resetDetailPage());
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
