import time

from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By

driver_path = r"D:\Git-Repos\Code\Python\Selenium\chromedriver.exe"
service = Service(driver_path)
options = Options()
options.add_argument("--no-sandbox")
options.add_argument("--disable-dev-shm-usage")
options.add_argument("--disable-extensions")
options.add_argument("--remote-debugging-port=9222")
options.add_argument("--disable-gpu")
options.add_argument("--start-maximized")

driver = webdriver.Chrome(service=service, options=options)

try:
    driver.get("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
    print('Waiting 4 seconds for page to load fully...')
    time.sleep(4)
    driver.find_element(By.NAME, 'username').send_keys('Admin')
    driver.find_element(By.NAME, 'password').send_keys('admin123')
    driver.find_element(By.CLASS_NAME, 'oxd-button').click()
finally:
    print('Waiting 4 seconds before quitting the page...')
    time.sleep(4)
    driver.quit()
