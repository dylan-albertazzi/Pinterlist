from bs4 import BeautifulSoup
from bs4.element import Tag
import requests
from fractions import Fraction
# from re_vulgar_fractions import check_vulgar
from string_to_object import clean_string, get_multiple_items
import sys
import json

def make_recipe_list(url):
    #Normal: https://www.shelikesfood.com/crispy-baked-black-bean-sweet-potato-tacos/
    # url = 'https://www.pinterest.com/pin/338895940715006219/'
    
    source = requests.get(url).text
    soup = BeautifulSoup(source, 'lxml')

    #search for structured json data in the webpage. This is the first choice.
    recipeContent = soup.find("script", id="initial-state") #this is the script that holds the recipe info

    if recipeContent is not None:
        data = {}
        recipe_items_list = []
        # data['items'] = recipeContent.string
        jsonData = json.loads(recipeContent.string)
        try:
            recipeData = jsonData["resourceResponses"][0]["response"]["data"]["rich_metadata"]["recipe"]
            categorizedIngredients = recipeData["categorized_ingredients"]
            for category in categorizedIngredients:
                for ingredient in category["ingredients"]:
                    recipe_items_list.append(ingredient["name"])
            
            data['items'] = recipe_items_list
            json_data = json.dumps(data)
            print(json_data) #this sends it to stdout so it can be used by node
            return recipe_items_list
        except:
            pass

    #if there is no structured data scape the page ourself
    recipeURL = jsonData["resourceResponses"][0]["response"]["data"]["tracked_link"]

    recipeSource = requests.get(recipeURL).text
    soup = BeautifulSoup(recipeSource, 'lxml')

    lists = soup.select('body ul')
    data = {}
 
        
    recipe_items_list = []
    for li in lists: #look through all lists on the webpage
        
        if len(li.contents) < 1: #Skip empty lists
            break

        i = 0
        while i < len(li.contents) and (isinstance(li.contents[i], Tag) is False): #This gets rid of errors where non li elements are part of the list like ('\n)
            i += 1

        first_item = li.contents[i].text

        #Counters to check what fraction of list items start with a number
        num_items = 0
        items_w_nums = 0

        if len(first_item) > 0: #make sure there is text present in the list

            #loop through the list
            for item in li.contents:
                # item.text.strip()
                if isinstance(item, Tag) and (len(item.text.strip()) > 0): #This gets rid of errors where non li elements are part of the list like ('\n)
                    if item.text.strip()[0].isdigit(): #strip removes any leading and trailing whitespace
                        items_w_nums += 1
                    num_items += 1
                

            if items_w_nums / num_items > 0.5:
                #append recipe_items to 
                for item in li.contents:
                    if isinstance(item, Tag): #This gets rid of errors where non li elements are part of the list like ('\n)
                        # new_item = recipe_item(item.text)
                        #clean text
                        #split if there's an and
                        cleaned_item = clean_string(item.text)
                        
                        for many_item in get_multiple_items(cleaned_item):
                            if len(many_item) > 1:
                                recipe_items_list.append(many_item)

    data['items'] = recipe_items_list
    json_data = json.dumps(data)
    print(json_data) #this sends it to stdout so it can be used by node
    return recipe_items_list



# make_recipe_list(sys.argv[1])
make_recipe_list("https://www.pinterest.com/pin/AUKKRTuUvRP50rClh3mU_8eYZsn7AQDZyKEvkpmwGF87hqa30r9jX_M/")