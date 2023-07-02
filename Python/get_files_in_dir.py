import os

def count_files(directory):
    total_files = 0

    for root, dirs, files in os.walk(directory):
        # print(root, dirs, files)
        # break
        total_files += len(files)

    return total_files

drive_path = r'D:\Archives'
file_count = count_files(drive_path)
print(f"Total files in {drive_path}: {file_count}")
