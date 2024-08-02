import os
import pyperclip

def get_all_files_in_directory(directory, ignore_dirs=None):
    if ignore_dirs is None:
        ignore_dirs = ['node_modules', '.next', '.git']
    
    all_files = []
    for root, dirs, files in os.walk(directory):
        # 移除不需要遍历的目录
        dirs[:] = [d for d in dirs if d not in ignore_dirs]
        
        for file in files:
            all_files.append(os.path.join(root, file))
    return all_files

# 使用示例
directory_path = '/Users/hroyhong/Desktop/nextjs/VPN-for-Tourists'
all_files = get_all_files_in_directory(directory_path)

# 将文件路径连接成一个字符串，并复制到剪贴板
files_string = '\n'.join(all_files)
pyperclip.copy(files_string)

print("All file paths (excluding node_modules) have been copied to the clipboard.")