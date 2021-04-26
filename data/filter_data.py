#!/usr/bin/python3
import enum
import json
import re
import sys


# Naming is to keep it consistent with the JS enum
class SiteType(enum.Enum):
    soupKitchen = "soupKitchen"
    foodBank = "foodBank"


TARGET_TAXONOMIES = {
    "After School Meal Programs": SiteType.soupKitchen,
    "Child and Adult Care Food Programs": SiteType.soupKitchen,
    "Commodity Supplemental Food Program": SiteType.foodBank,
    "Congregate Meals/Nutrition Sites": SiteType.soupKitchen,
    "Food Banks/Food Distribution Warehouses": SiteType.foodBank,
    "Grocery Ordering Delivery": SiteType.foodBank,
    "Home Delivered Meals": SiteType.soupKitchen,
    "Occasional Emergency Food Assistance": SiteType.foodBank,
    "Ongoing Emergency Food Assistance": SiteType.foodBank,
    "Packed Lunches/Dinners": SiteType.soupKitchen,
    "School Lunches/Snacks": SiteType.soupKitchen,
    "Soup Kitchens": SiteType.soupKitchen,
    "WIC Applications/Certification": SiteType.foodBank,
}


def process(data):
    filters = (lambda d: d["service"]["Service_Status__c"] == "Active",)
    soup_kithen_regex = re.compile(r"/(?:)lunch|meal|breakfast|dinner/", re.IGNORECASE)
    for d in data:
        if all(f(d) for f in filters):
            for tax in d.get("taxonomies", []):
                site_type = TARGET_TAXONOMIES.get(tax["Name"])
                if site_type is not None:
                    break
            else:
                site_type = (
                    SiteType.soupKitchen
                    if soup_kithen_regex.match(d["service"]["Description__c"])
                    else SiteType.foodBank
                )
            d["service"]["Type"] = site_type.value
            d["service"]["Taxonomies"] = [
                tax["Name"] for tax in d.get("taxonomies", [])
            ]
            yield d


if __name__ == "__main__":
    arg_len = len(sys.argv)
    if arg_len < 2:
        sys.exit("File source and destination not passed")
    elif arg_len == 2:
        sys.exit("File destination not passed")
    with open(sys.argv[1]) as f:
        data = json.load(f)
    data = list(process(data))
    with open(sys.argv[2], "w") as f:
        json.dump(data, f, indent=2)
