import React, {Component} from 'react';
import exploreStyles from '../styles/explore.css';
import {
    Button, Card, CardTitle, CardSubtitle, CardHeader, CardText, Title,
    Icon, List, ListHeader, ListGroup
} from 'react-mdc-web/lib';
import ExploreAccordionSections from '../containers/ExploreAccordionSections';
import {sortSitesNumerically} from '../utils/arrayUtils';


class ExploreCategoriesTab extends Component {
    constructor(props: Object) {
        super(props);
        this.state = {
            accordion_icon: false,
        };
        (this:any).clickedCategoriesAccordion = this.clickedCategoriesAccordion.bind(this);
    }

    clickedCategoriesAccordion() {
        this.setState({accordion_icon: !this.state.accordion_icon});
    }

    render() {

        let item_card = [];
        let list_cards = [];

        // Get Single Category
        let category = this.props.parameterCategory;

        // Get Parameters based upon this category
        let parameterMappings = this.props.parameterMappings.filter(mapping => mapping.category_id === category.id);

        // Go through each Parameter in this Category
        parameterMappings.map(paramMapItem => {

            // Get Parameter Info from the Parameter Mapping
            let parameter = this.props.parameters.filter(param => param.id === paramMapItem.parameter_id);
            if (parameter) {
                parameter = parameter[0];
            }

            let contents = [];

            this.props.sources.map(source => {

                let key_val = source.id;
                let tooltip_val = source.label;
                let section_label = source.id.toUpperCase();

                let source_data = this.props.data.filter(data =>
                    data.properties.type.id === source.id &&
                    data.parameters.includes(parameter.name));

                // If the Name is a Number, then sort numerically instead of alphabetically
                source_data = sortSitesNumerically(source_data);

                let section_data = (
                    <ExploreAccordionSections
                        sourceData={source_data} tooltipVal={tooltip_val}
                        id={key_val} key={key_val} sectionLabel={section_label}
                    />
                );

                if (section_data.props.sourceData.length > 0) {
                    contents.push(section_data);
                }

            });

            if (contents.length > 0) {
                item_card.push(
                    <List className={this.state.accordion_icon ?
                        exploreStyles.listItemsStyleOpen : exploreStyles.listItemsStyleClosed}
                    >
                        <Card id={parameter.title} className={exploreStyles.exploreSubCard} key={parameter.title}>
                            <CardHeader>
                                <CardTitle className={exploreStyles.exploreTitleCard}>
                                    {parameter.title}
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

            let label = category.name;
            if (label.length === 0) {
                label = "other";
            }

            return_list = (
                <ListGroup className={exploreStyles.listWidthStyle}>
                    <ListHeader className={exploreStyles.listSubheaderStyle}
                                onClick={() => {this.clickedCategoriesAccordion()}}
                    >
                        {label}
                        <Icon className={"material-icons " + exploreStyles.accordionIcon}
                              name={this.state.accordion_icon ? 'expand_more' : 'chevron_right'}
                        />
                    </ListHeader>
                    {list_cards}
                </ListGroup>
            );

        }

        return(<div>{return_list}</div>)

    }
}

export default ExploreCategoriesTab;
