import React, {Component} from 'react';
import exploreStyles from '../styles/explore.css';
import {
    Button, Card, CardTitle, CardSubtitle, CardHeader, CardText,
    Icon, List, ListHeader, ListGroup
} from 'react-mdc-web/lib';
import ExploreAccordionSections from '../containers/ExploreAccordionSections';
import {sortSitesNumerically} from '../utils/arrayUtils';


class ExploreCustomItemsTab extends Component {
    constructor(props: Object) {
        super(props);
        this.state = {
            accordion_icon: false,
        };
        (this:any).clickedItemsAccordion = this.clickedItemsAccordion.bind(this);
    }

    clickedItemsAccordion() {
        this.setState({accordion_icon: !this.state.accordion_icon});
    }

    render() {

        let item_card = [];
        let list_cards = [];
        let sites_count = 0;

        this.props.item.sections.map(item_section => {

            let contents = [];
            sites_count = 0;

            this.props.sources.map(source => {

                let key_val = source.id;
                let tooltip_val = source.label;
                let section_label = source.id.toUpperCase();

                let source_data = this.props.data.filter(data =>
                    data.properties.huc !== undefined &&
                    data.properties.type.id === source.id &&
                    item_section.value.includes(data.properties.huc[item_section.property].code));

                // If the Name is a Number, then sort numerically instead of alphabetically
                source_data = sortSitesNumerically(source_data);
                sites_count = sites_count + source_data.length;
                let section_data;
                if (source_data.length > 0) {
                    section_data = (
                        <ExploreAccordionSections
                            sourceData={source_data} tooltipVal={tooltip_val} id={key_val}
                            key={key_val} sectionLabel={section_label} sourceId={source.id}
                        />
                    );
                    if (section_data.props.sourceData.length > 0) {
                        contents.push(section_data);
                    }
                }

            });

            if (contents.length > 0) {
                item_card.push(
                    <List className={this.state.accordion_icon ?
                        exploreStyles.listItemsStyleOpen : exploreStyles.listItemsStyleClosed}
                    >
                        <Card id={item_section.title} className={exploreStyles.exploreCard} key={item_section.title}>
                            <CardHeader>
                                <CardTitle className={exploreStyles.exploreTitleCard}>
                                    {item_section.title}: {item_section.value.toString().replace(/,/g, ', ')} ({sites_count})
                                </CardTitle>
                            </CardHeader>
                            <CardText>
                                <div key={this.id}>
                                    {contents}
                                </div>
                            </CardText>
                        </Card>
                    </List>
                );
            }

        });

        let return_list = '';

        if (item_card.length > 0) {

            list_cards.push(item_card);

            return_list = (
                <ListGroup className={exploreStyles.listWidthStyle}>
                    <ListHeader className={exploreStyles.listHeaderStyle}
                                onClick={() => {this.clickedItemsAccordion()}}
                    >
                        {this.props.item.title}
                        <Icon className={"material-icons " + exploreStyles.accordionIcon}
                              name={this.state.accordion_icon ? 'expand_more' : 'chevron_right'}
                        />
                    </ListHeader>
                    {list_cards}
                </ListGroup>
            );

        } else {

            return_list = (
                <ListGroup className={exploreStyles.listWidthStyle}>
                    <ListHeader className={exploreStyles.listHeaderStyle}>
                        {this.props.item.title}
                    </ListHeader>
                    <Card className={exploreStyles.exploreCard}><CardText>None Available</CardText></Card>
                </ListGroup>
            );

        }

        return(<div>{return_list}</div>)

    }
}

export default ExploreCustomItemsTab;
