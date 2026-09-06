# -*- coding: utf-8 -*-
import json
import os

from compile_data import data as dhaka_districts
from chattogram import chattogram_districts
from sylhet_rajshahi import sylhet_districts, rajshahi_districts
from khulna_barishal import khulna_districts, barishal_districts
from rangpur_mymensingh import rangpur_districts, mymensingh_districts

all_districts = (
    dhaka_districts +
    chattogram_districts +
    sylhet_districts +
    rajshahi_districts +
    khulna_districts +
    barishal_districts +
    rangpur_districts +
    mymensingh_districts
)

print(f"Total merged districts: {len(all_districts)}")

# Verify uniqueness of id and geoName
ids = set()
geo_names = set()
for d in all_districts:
    if d['id'] in ids:
        print(f"Duplicate id: {d['id']}")
    ids.add(d['id'])
    geo_names.add(d['geoName'])

print(f"Distinct IDs: {len(ids)}, Distinct GeoNames: {len(geo_names)}")

# Verify against GeoJSON
with open('./public/data/bd-districts-64.json', 'r', encoding='utf-8') as f:
    geo_json = json.load(f)

geo_features = {f['properties']['ADM2_EN'] for f in geo_json['features']}
print(f"GeoJSON feature count: {len(geo_features)}")

missing_in_geo = [d['geoName'] for d in all_districts if d['geoName'] not in geo_features]
print(f"Missing in GeoJSON: {missing_in_geo}")

missing_in_data = [g for g in geo_features if g not in geo_names]
print(f"Missing in Data: {missing_in_data}")

# Write to /src/data/districts.json
os.makedirs('./src/data', exist_ok=True)
with open('./src/data/districts.json', 'w', encoding='utf-8') as f:
    json.dump(all_districts, f, ensure_ascii=False, indent=2)

print("Saved /src/data/districts.json successfully!")
