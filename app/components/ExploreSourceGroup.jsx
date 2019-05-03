/*
 * @flow
 */

import React, {Component} from 'react'
import exploreStyles from '../styles/explore.css';
import {Card, CardTitle, CardHeader, CardText, Icon} from 'react-mdc-web/lib';
import {getColor, startExploreSourcesOpened} from '../utils/getConfig';


class ExploreSourceGroup extends Component {
    state: {
        accordion_icon: boolean,
        source_group_icon: boolean,
    };

    constructor(props: Object) {
        super(props);
        this.state = {
            accordion_icon: startExploreSourcesOpened(),
            source_group_icon: true,
        };
        (this: any).clickedSourceGroup = this.clickedSourceGroup.bind(this);
    }

    clickedSourcesAccordion() {
        this.setState({accordion_icon: !this.state.accordion_icon});
    }

    clickedSourceGroup(source_id: string) {
        this.setState({source_group_icon: !this.state.source_group_icon});

        let selected_sources = this.props.selectedDataSources;
        let available_sources = this.props.availableDataSources;
        let source_status = false;
        let updated_sources = selected_sources;

        selected_sources.map(source => {
            if (source.id === source_id) {
                source_status = true;
            }
        });

        if (source_status === true) {
            updated_sources = selected_sources.filter(
                source => source.id.toString().toUpperCase() !== source_id.toString().toUpperCase());
        } else {
            let new_item = available_sources.filter(
                source => source.id.toString().toUpperCase() === source_id.toString().toUpperCase());
            updated_sources.push(new_item[0]);
        }

        this.props.clickedSource(updated_sources);
    }

    render() {

        let color = getColor(this.props.source.id);
        let source_contents = this.props.contents;

        let source_card = (
            <div id={this.props.source.id} className={exploreStyles.exploreCard} key={this.props.source.id}>
                <CardHeader>
                    <CardTitle>
                        <div className={exploreStyles.exploreTitleCard}>
                            <div className={exploreStyles.exploreTitleLeft} style={{backgroundColor: color}}>
                                <Icon className={"material-icons " + exploreStyles.exploreSourcesSelectionIcon}
                                      style={{backgroundColor: color}}
                                      name={this.state.source_group_icon ? 'check_circle' : 'radio_button_unchecked'}
                                      onClick={() => {
                                          this.clickedSourceGroup(this.props.source.id)
                                      }}
                                />
                            </div>
                            <div className={exploreStyles.exploreTitleRight}
                                 onClick={() => {
                                     this.clickedSourcesAccordion()
                                 }}
                            >
                                {this.props.source.label}
                            </div>
                            <span className={exploreStyles.exploreSourcesCountAndIcon}
                                  onClick={() => {
                                      this.clickedSourcesAccordion()
                                  }}
                            >
                                ({this.props.sites_count})

                            </span>
                            <span className={exploreStyles.exploreSourcesIcon}
                                  onClick={() => {
                                      this.clickedSourcesAccordion()
                                  }}
                            >
                                {this.props.dialog_contents}
                                <Icon className={"material-icons " + exploreStyles.groupAccordionIcon}
                                      name={this.state.accordion_icon ? 'expand_more' : 'chevron_right'}
                                />
                            </span>
                        </div>
                    </CardTitle>
                </CardHeader>
                <CardText>
                    <div key={this.props.source.id}
                         className={this.state.accordion_icon ?
                             exploreStyles.sourceItemsStyleOpen : exploreStyles.sourceItemsStyleClosed}
                    >
                        {source_contents}
                    </div>
                </CardText>
            </div>
        );

        return (
            <div>{source_card}</div>
        );

    }
}

export default ExploreSourceGroup;
