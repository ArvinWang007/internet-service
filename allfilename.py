import os
import pyperclip

def get_all_files_in_directory(directory):
    all_files = []
    for root, dirs, files in os.walk(directory):
        for file in files:
            all_files.append(os.path.join(root, file))
    return all_files

# 使用示例
directory_path = '/Users/hroyhong/Desktop/nextjs/VPN-for-Tourists'
all_files = get_all_files_in_directory(directory_path)

# 将文件路径连接成一个字符串，并复制到剪贴板
files_string = '\n'.join(all_files)
pyperclip.copy(files_string)

print("All file paths have been copied to the clipboard.")


