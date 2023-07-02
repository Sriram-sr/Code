import os
import json

product = {
    'id': 1,
    'title': 'Smartphone',
    'price': 10000
}

folder_name = 'data'
file_name = 'products.json'
file_directory = os.getcwd()
json_file_path = os.path.join(file_directory, folder_name, file_name)

with open(json_file_path, 'a+') as json_file:
    json.dump(product, json_file)
