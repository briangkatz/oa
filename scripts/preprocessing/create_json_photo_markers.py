import pandas as pd
import json

# Set input and output directories
infile = 'boundaries/tribes_pnw_4326_images.csv'
outfile = 'boundaries/photos.json'

photos = []

df = pd.read_csv(infile, sep=',', encoding='ISO-8859-1')

for i, j in df.iterrows():
    photo = {
        'url': j['url'],
        'thumbnail': j['url'],
        'source': j['source'],
        'caption': j['NAMELSAD'],
        'lat': j['INTPTLAT'],
        'lng': j['INTPTLON'],
        'geoid': j['GEOID'],
    }
    photos.append(photo)

# Save JSON file
with open(outfile, 'w') as f:
    json.dump(photos, f)
