function getLocationName(source) {
    const named_locations =
        {
            "OH": "Ohio",
            "HU": "Lake Huron",
            "ON": "Lake Ontario",
            "MI": "Lake Michigan",
            "ER": "Lake Erie",
            "SU": "Lake Superior",
        };
    return named_locations[source] !== undefined ? named_locations[source] : source;
}

export default getLocationName