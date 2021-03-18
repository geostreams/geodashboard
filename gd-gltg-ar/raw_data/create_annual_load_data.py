import csv
import json

SOURCES = {
    'Nutrient Load to Gulf of Mexico': './nitrate_gulf_of_mexico.csv',
    'Illinois R, at Valley City': './nitrate_illinois_river.csv',
    'USGS_05465500': './nitrate_iowa_river.csv'
}

data = {}
for label, path in SOURCES.items():
    source_data = {
        'annual_load': [],
        'normalized_flow': [],
        'confidence_interval': []
    }
    with open(path, 'r') as f:
        raw_data = list(csv.reader(f))
        for (year, load, flow, lower, upper) in raw_data[1:]:
            source_data['annual_load'].append({
                'x': int(year),
                'y': float(load)
            })
            source_data['normalized_flow'].append({
                'x': int(year),
                'y': float(flow)
            })
            source_data['confidence_interval'].append({
                'x': int(year),
                'y0': float(lower),
                'y1': float(upper)
            })
    data[label] = source_data

with open('../src/data/annual_load.json', 'w') as f:
    f.write(json.dumps(data))
