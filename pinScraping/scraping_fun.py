from bs4 import BeautifulSoup
import requests
import json

source = requests.get("https://www.pinterest.com/pin/314970567689776485/")
doc = source.text
soup = BeautifulSoup(doc, 'lxml')

recipeContent = soup.find("script", id="initial-state")

data = {}
recipe_items_list = []
# data['items'] = recipeContent.string
jsonData = json.loads(recipeContent.string)
recipeData = jsonData["resourceResponses"][0]["response"]["data"]["rich_metadata"]["recipe"]
categorizedIngredients = recipeData["categorized_ingredients"]
for category in categorizedIngredients:
    for ingredient in category["ingredients"]:
        recipe_items_list.append(ingredient["name"])
# Program to show various ways to read and 
# write data in a file. 

yay = 0