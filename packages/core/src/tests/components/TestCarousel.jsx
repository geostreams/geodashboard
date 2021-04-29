import React from 'react';

import Carousel from '../../components/Carousel';

const TestCarousel = () => (
    <div style={{ margin: 150 }}>
        <Carousel slidesInterval={1500}>
            {['red', 'green', 'blue'].map((color, idx) => (
                <div
                    key={color}
                    style={{
                        border: `1px ${color} solid`,
                        height: 200,
                        width: 300,
                        padding: 50
                    }}
                >
                    Slide {idx + 1}
                </div>
            ))}
        </Carousel>
    </div>
);

export default TestCarousel;
