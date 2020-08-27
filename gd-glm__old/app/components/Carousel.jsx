// This Component creates a Carousel of Images
// It will transition images every 3 seconds
// The User can manually select an image using navigation options
// The User can also Pause and Play the Carousel

import React, {Component} from "react";
import styles from '../styles/carousel.css';
import {Button, Fab, Icon, Card, CardTitle, CardActions, CardMedia} from 'react-mdc-web/lib';
import {getCarouselImageNames, getCarouselImageCaptions} from '../utils/getConfig';
import {Link} from 'react-router-dom';


class Carousel extends Component {

    state: {
        imageIndex: number,
        numImages: number,
        carouselActive: boolean,
        carouselPause: any,
    };

    constructor(props: Object) {
        super(props);
        this.state = {
            // The Index of the Image Displayed
            imageIndex: 1,
            // The number of Images in the Carousel
            numImages: getCarouselImageNames().length,
            // Is the Carousel active on the page?
            carouselActive: false,
            // Is the Carousel paused on the page?
            carouselPause: false,
        };
        (this: any).selectImage = this.selectImage.bind(this);
        (this: any).navIconSelectImage = this.navIconSelectImage.bind(this);
        (this: any).forwardImageAuto = this.forwardImageAuto.bind(this);
        (this: any).forwardImage = this.forwardImage.bind(this);
        (this: any).backwardImage = this.backwardImage.bind(this);
        (this: any).displayImage = this.displayImage.bind(this);
        (this: any).pauseCarousel = this.pauseCarousel.bind(this);
        (this: any).playCarousel = this.playCarousel.bind(this);
    }

    componentDidMount() {
        // Select the first image
        this.displayImage(this.state.imageIndex);
        let playButton = document.getElementById("carouselPlay");
        if (playButton) {
            window.onload = function () {
                playButton.click();
            };
        }
    }

    componentWillUnmount() {
        // Clear the Carousel Interval when the User leaves this page
        clearInterval(this.carouselInterval);
    }

    selectImage(index) {
        // User clicks to select a specific Image
        this.setState({carouselActive: false});
        this.displayImage(index);
        this.playCarousel();
    }

    pauseCarousel() {
        //Pauses the Carousel
        clearInterval(this.carouselInterval);
        this.setState({carouselPause: true, carouselActive: false});
    }

    playCarousel() {
        // Plays the Carousel
        this.carouselInterval = setInterval(() => {
            if (this.state.carouselActive && this.state.carouselPause === false) {
                this.forwardImageAuto();
            } else {
                this.setState({carouselPause: false, carouselActive: true});
            }
        }, 1500);
    }

    navIconSelectImage(index) {
        // User clicks to select a specific Image
        this.setState({carouselActive: false});
        this.displayImage(index);
        this.setState({imageIndex: 0});
    }

    forwardImageAuto() {
        // Move Carousel Forward Automatically
        let index = 1;
        this.setState({carouselActive: false});
        if (this.state.imageIndex >= this.state.numImages) {
            this.setState({imageIndex: index});
        } else {
            index = this.state.imageIndex + 1;
            this.setState({imageIndex: index});
        }
        this.displayImage(this.state.imageIndex);
    }

    forwardImage() {
        // User clicks the Forward Button
        let index = this.state.imageIndex + 1;
        this.setState({carouselActive: false});
        if (index > this.state.numImages) {
            this.setState({imageIndex: 1});
        } else {
            this.setState({imageIndex: index});
        }
        this.displayImage(this.state.imageIndex);
    }

    backwardImage() {
        // User clicks the Backward Button
        let index = this.state.imageIndex;
        this.setState({carouselActive: false});
        if (index <= 1) {
            index = this.state.numImages;
            this.setState({imageIndex: index});
        } else {
            index = this.state.imageIndex - 1;
            this.setState({imageIndex: index});
        }
        this.displayImage(this.state.imageIndex);
    }

    displayImage(imageIndex) {
        // Select the parent Div
        let images = document.getElementsByClassName("carouselImages");
        let icons = document.getElementsByClassName("carouselNavIcons");
        let captions = document.getElementsByClassName("carouselCaptions");

        // All images hidden by default
        for (let i = 0; i < images.length; i++) {
            images[i].style.display = "none";
            icons[i].style.color = "grey";
            captions[i].style.display = "none";
        }

        // Only show the current image
        if (images.length > 0) {
            images[imageIndex - 1].style.display = "block";
            icons[imageIndex - 1].style.color = "black";
            captions[imageIndex - 1].style.display = "block";
        }

        this.setState({carouselActive: false});
    }

    render() {

        let carouselImages = [];
        let carouselNavIcons = [
            <Button key={"carouselPauseButton"}
                    onClick={() => {
                        this.pauseCarousel()
                    }}>
                <Icon name={'pause_circle_outline'} key={"carouselPause"} id={"carouselPause"}
                      className={'carouselPause ' + styles.navIcons}
                      style={this.state.carouselPause === true ? {
                          color: "black"
                      } : {color: "grey"}}
                />
            </Button>
        ];
        let carouselCaptions = getCarouselImageCaptions();

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
            let captionText = '';
            let captionLink = '';

            if (Object.keys(carouselCaptions).length > 0) {
                captionText = (
                    <CardTitle className={styles.captionStyle}>
                        {carouselCaptions[indexVal].caption}
                    </CardTitle>
                );
                if (carouselCaptions[indexVal].link) {
                    captionLink = (
                        <CardActions className={styles.captionStyle}>
                            <Link className={styles.captionButtonStyle} href={carouselCaptions[indexVal].link}>
                                <Button>
                                    <div className={styles.captionIcon}>
                                        <Icon name={'import_contacts'} key={"data_icon"} id={"data_icon"}/>
                                    </div>
                                    <div className={styles.captionText}>{carouselCaptions[indexVal].linkText}</div>
                                </Button>
                            </Link>
                        </CardActions>
                    )
                }
            }

            carouselImages.push(
                <div className={'carouselCaptions ' + styles.imageTransition} key={"text" + indexVal}>
                    <div>
                        <CardMedia>
                            <div className={'carouselImages ' + styles.imageTransition} key={"image" + indexVal}>
                                <img className={styles.imageSize} src={require("../../theme/" + image).default}/>
                            </div>
                        </CardMedia>
                        {captionLink}
                        {captionText}
                    </div>
                </div>
            );

            carouselNavIcons.push(
                <Icon name={'fiber_manual_record'} key={"navImage" + indexVal} id={indexVal}
                      className={'carouselNavIcons ' + styles.navIcons}
                      onClick={() => {
                          this.navIconSelectImage(indexVal)
                      }}
                />
            );
        });

        carouselNavIcons.push(
            <Button key={"carouselPlayButton"}
                    onClick={() => {
                        this.playCarousel()
                    }}>
                <Icon name={'play_circle_outline'} key={"carouselPlay"} id={"carouselPlay"}
                      className={'carouselPlay ' + styles.navIcons}
                      style={this.state.carouselPause === false ? {
                          color: "black"
                      } : {color: "grey"}}
                />
            </Button>
        );

        return (
            <div className={styles.carouselContainer}>
                {carouselArrows}
                {carouselImages}
                <span className={styles.navIconsPosition}>{carouselNavIcons}</span>
            </div>
        );

    }

}

export default Carousel;
