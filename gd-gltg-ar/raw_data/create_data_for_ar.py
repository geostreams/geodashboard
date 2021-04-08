import csv
import json

SOURCES = {
    'ar-20': './ANRD_Priority-HUC_Site-Specific-Trend-Results-20-yr_red.csv',
}

def is_float(x):
    try:
        a = float(x)
    except (TypeError, ValueError):
        return False
    else:
        return True


def is_int(x):
    try:
        a = float(x)
        b = int(a)
    except (TypeError, ValueError):
        return False
    else:
        return a == b

res = {}
for label, path in SOURCES.items():
    source_data = {
        'ar-20': [],
    }
    with open(path, 'r') as data:
        for line in csv.DictReader(data):
            cur = {}
            huc_id = line['\xef\xbb\xbfHUCID']

            raw_data = line.copy()
            del raw_data['\xef\xbb\xbfHUCID']

            for key, val in raw_data.items():
                if is_float(val) or is_int(val):
                    raw_data[key] = float(val)

            res[huc_id]=raw_data

print(res)
with open('arkansas_aggregate_data.json', 'w') as fp:
    json.dump(res, fp, indent=2)



