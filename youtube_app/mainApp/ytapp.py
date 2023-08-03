import os
import sys

# Get the current directory of app.py
current_dir = os.path.dirname(os.path.abspath(__file__))
parent_dir = os.path.join(current_dir, "..")  # Go one level up
sys.path.append(parent_dir)

from powerful import *

url = input("Video URL: \n")
reso = input("resolution: \n")
path = input("Path (This Folder) => default: \n")
download_path_video(url, reso, path)
