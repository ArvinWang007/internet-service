import requests
from bs4 import BeautifulSoup
import pyperclip

def copy_webpage_elements(url):
    # 发送HTTP请求获取网页内容
    response = requests.get(url)
    response.raise_for_status()  # 检查请求是否成功

    # 使用BeautifulSoup解析网页内容
    soup = BeautifulSoup(response.text, 'html.parser')

    # 获取网页的body部分
    body = soup.find('body')
    if body:
        # 将body内容转换为字符串
        body_string = str(body)
        # 复制到剪贴板
        pyperclip.copy(body_string)
        print("Webpage elements have been copied to the clipboard.")
    else:
        print("No body element found in the webpage.")

# 使用示例
url = 'http://localhost:3000/'  # 替换为你要复制的网页URL
copy_webpage_elements(url)



