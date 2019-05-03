// This Component creates a Carousel of Images
// It will transition images every 3 seconds
// The User can manually select an image using navigation options

import React, {Component} from "react";
import styles from '../styles/carousel.css';
import {Fab, Icon} from 'react-mdc-web/lib';
import {getCarouselImageNames} from '../utils/getConfig';


class Carousel extends Component {

    state: {
        imageIndex: number,
        numImages: number,
        carouselActive: boolean
    };

    constructor(props: Object) {
        super(props);
        this.state = {
            imageIndex: 1,
            numImages: getCarouselImageNames().length,
            carouselActive: false
        };
        (this: any).selectImage = this.selectImage.bind(this);
        (this: any).forwardImage = this.forwardImage.bind(this);
        (this: any).backwardImage = this.backwardImage.bind(this);
        (this: any).displayImage = this.displayImage.bind(this);
    }

    componentDidMount() {
        // Select the first image
        this.displayImage(this.state.imageIndex);

        // Start the Carousel transitions at page load
        this.carouselInterval = setInterval(() => {
            if (this.state.carouselActive) {
                this.forwardImage();
            } else {
                this.setState({carouselActive: true});
            }
        }, 1500);
    }

    componentWillUnmount() {
        // Clear the Carousel Interval when the User leaves this page
        clearInterval(this.carouselInterval);
    }

    selectImage(index) {
        // User clicks to select a specific Image
        this.setState({carouselActive: false, imageIndex: index});
        this.displayImage(index);
    }

    forwardImage() {
        // User clicks the Forward Button
        let index = 1;
        this.setState({carouselActive: false});
        if (this.state.imageIndex >= this.state.numImages) {
            this.setState({imageIndex: index});
        } else {
            index = this.state.imageIndex + 1;
            this.setState({imageIndex: index});
        }
        this.displayImage(index);
    }

    backwardImage() {
        // User clicks the Backward Button
        let index = this.state.imageIndex;
        this.setState({carouselActive: false});
        if (index <= 1) {
            index = this.state.numImages;
            this.setState({imageIndex: this.state.numImages});
        } else {
            index = this.state.imageIndex - 1;
            this.setState({imageIndex: index});
        }
        this.displayImage(index);
    }

    displayImage(imageIndex) {
        // Select the parent Div
        let images = document.getElementsByClassName("carouselImages");

        // All images hidden by default
        for (let i = 0; i < images.length; i++) {
            images[i].style.display = "none";
        }

        // Only show the current image
        if (images.length > 0) {
            images[imageIndex - 1].style.display = "block";
        }

        this.setState({carouselActive: false});
    }

    render() {

        let carouselImages = [];
        let carouselNavIcons = [];

        // Setup Navigation Arrows Backward and Forward for the Carousel
        let carouselArrows = (
            <div className={styles.navButtons}>
                <Fab mini className={styles.backButton} onClick={this.backwardImage}>
                    <Icon name="chevron_left"/>
                </Fab>
                <Fab mini className={styles.forwardButton} onClick={this.forwardImage}>
                    <Icon name="chevron_right"/>
                </Fab>
            </div>
        );

        getCarouselImageNames().map((image, i) => {
            // Used for values below
            let indexVal = i + 1;

            // Import Images for the Carousel
            carouselImages.push(
                <div className={'carouselImages ' + styles.imageTransition} key={"image" + indexVal}>
                    <img className={styles.imageSize} src={require("../../theme/" + image)}/>
                </div>
            );

            // Setup Navigation Icons Below Images for the Carousel
            carouselNavIcons.push(
                <Icon name={this.state.imageIndex === indexVal ? 'radio_button_checked' : 'radio_button_unchecked'}
                      className={styles.navIcons} key={"navImage" + indexVal} id={indexVal}
                      onClick={() => {
                          this.selectImage(indexVal)
                      }}
                />
            );
        });

        return (
            <div className={styles.carouselContainer}>
                {carouselImages}
                {carouselArrows}
                {carouselNavIcons}
            </div>
        );

    }

}

export default Carousel;