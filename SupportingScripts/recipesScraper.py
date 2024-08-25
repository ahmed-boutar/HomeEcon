from selenium import webdriver
from bs4 import BeautifulSoup
import csv

f=open("link_list.txt",encoding="utf-8" )
for line in f:
    recipe_url = line

    driver = webdriver.Chrome("/Users/ahmedboutar/Documents/chromedriver")
    products = [] #List to store name of the recipe
    ingredients = [] #List to store ingredients of each recipe
    links = [] #list of the links to be accessed

    driver.get(recipe_url)
    driver.implicitly_wait(100)
    button = driver.find_element_by_id('shopping-selector-parent-process-modal-close-click')
    button.click()
    content = driver.page_source
    soup = BeautifulSoup(content, 'html.parser')
    for a in soup.findAll('div', attrs={'class':'recipe-content-center'}):
        name = a.find('h1', attrs={'class':'recipe-name ng-binding'})
        products.append(name.text)
        for b in soup.findAll('div', attrs={'class':'related-product-name-price'}):
            for ingredient in b.find_all('button', attrs={'class':'title ng-binding no-sponsor'}):
                ingredients.append(ingredient.text)
    with open('data.csv', 'a+', newline='') as file:
        data_writer = csv.writer(file, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)
        data_writer.writerow([recipe_url, products, ingredients])
    driver.close()
