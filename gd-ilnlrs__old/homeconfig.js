export const gd3 = {

    // Geostreaming API Information - this is also displayed in the Welcome Page dropdown selector
    geostreaming_endpoints: [
        {url: "https://gltg-dev.ncsa.illinois.edu/geostreams", label: "GLTG DEV", title: "Great Lakes to Gulf",
            subtitle: "VIRTUAL OBSERVATORY"},
        {url: "https://greatlakestogulf.org/geostreams", label: "GLTG PROD", title: "Great Lakes to Gulf",
            subtitle: "VIRTUAL OBSERVATORY"},
    ],

    // Home Page Carousel file names - Should be located in /geodashboard-v3/theme folder
    home_page_carousel_images: [
        "story1.png",
        "story2.png",
        "story3.png",
        "story4.png",
        "story5.png",
        "story6.png",
        "story7.png",
        "story8.png",
        "story9.png",
        "story10.png"
    ],

    // Home Page Info Icon Title - Boundary Type
    boundary_title: 'Boundary Type',
    // Home Page Info Icon Text - Boundary Type
    boundary_description: {
        'description': 'IL Drainage – This view represents the land area that drains through each of the measurement points represented on the map as circles with a monitoring buoy. These stations were chosen as part of the Illinois Nutrient Loss Reduction Strategy because they measure the runoff from about 75% of the land area of the state of Illinois.\n' +
            'HUC 8 – HUCs, or Hydrologic Unit Codes are standardized boundaries that basically represent watersheds of different sizes, and are often used in water quality tracking. HUC-8 is a medium-sized watershed, and there are 31 such HUCs in the state of Illinois. The Illinois Nutrient Reduction Strategy has used modeling to estimate the nutrient yield from all of the HUC-8s in the State of Illinois.\n' +
            'Watershed Boundaries – This view highlights the watershed or the land area that drains through the point represented on the map as a pin. These locations are designated as “sentinel sites” because tracking water quality trends at these locations can be used to track progress in reducing nutrient loads from the watersheds above them. Many of these particular sites were selected because they are mostly contained within a single state, and thus can be used to track that state’s nutrient reduction progress.\n' +
            'Load to Gulf – This site, the Mississippi River at St. Francisville is used to measure the total load of nutrients that are delivered to the Gulf of Mexico in a given water year (12 Months beginning October 1). This site is used because it is just upstream from the Gulf, and yet does not behave like an estuary. Because some Mississippi River water is diverted to the Atchafalya River, appropriate corrections are made to report total load.\n'
    },
    // Home Page Info Icon Title - Nutrient
    nutrient_title: 'Nutrient Type',
    // Home Page Info Icon Text - Nutrient
    nutrient_description: {
        'description': 'Nitrogen and Phosphorus are the two main nutrients that cause the algal blooms that lead to hypoxia in the Gulf of Mexico.\n' +
            'Nitrogen – the main source of nitrogen is runoff from agriculture, though there are other sources as well such as urban areas and industry.\n' +
            'Phosphorus – the main source of phosphorus is wastewater treatment, though there are other sources as well such as erosion.\n'
    },

    home_page_carousel_captions: [
        "Evaluating Nitrogen and Phosphorus Loads in Mississippi",
        "Illinois Nutrient-Loss Reduction Strategy",
        "Exploring Data in the GLTG Portal",
        "What Are Layers and Why Do They Matter?",
        "All About Data Collection",
        "Continuous Monitoring",
        "Best Management Practices",
        "Crop Scape",
        "NOAA",
        "Sparrow Model"
    ],

    contextual_layers: [
        {
            url: "https://greatlakestogulf.org/geoserver/wms",
            id: "gltg:us-states",
            title: "State Boundaries"
        },
        {
            url: "https://greatlakestogulf.org/geoserver/wms",
            id: "gltg:us-rivers",
            title: "Rivers"
        }
    ]

}
// ATTENTION: don't add semicolon at the end of this config. config.js on production will wrap this with additional {}
// Keep the next new line at the end of the file
