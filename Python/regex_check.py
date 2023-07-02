import re

location = '0/rp0/cpu0'
pattern = r'(\d\/([\d\w]+)(\/[\w\d]+)?)'

search = re.search(pattern, location)
print(search.group(0))
print(search.group(1))
print(search.group(2))
print(search.group(3))