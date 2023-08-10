# Fady.py
import requests
import os
import random
from pytube import YouTube
from colorama import init, Fore

init()


# youtube download
def on_complete(stream, filepath):
    print(Fore.LIGHTGREEN_EX + "Download complete! \033[39m \n")
    print(Fore.LIGHTBLUE_EX + "video was downloaded in: \033[39m" + filepath + "\n")


def on_progress(stream, chunk, bytes_remaining):
    progress_string = (
        Fore.CYAN + f"{round(100 - (bytes_remaining / stream.filesize * 100),2)}%"
    )
    print(progress_string)


download_path = os.path.join(os.path.expanduser("~"), "Downloads")


def download_video(link, resolution):
    try:
        yt = YouTube(link)
        video_stream = yt.streams.filter(res=resolution).first()

        if not video_stream:
            print(f"No {resolution} resolution available for the video.")
            return

        print(f"Downloading: {yt.title} ({resolution})")
        video_stream.download(output_path=download_path)
        print("Download completed!")

    except Exception as e:
        print(f"Error: {e}")


def get_video_size(url):
    try:
        yt = YouTube(url)
        video_stream = (
            yt.streams.get_lowest_resolution()
        )  # Get the highest resolution stream

        if not video_stream:
            return "Video stream not available."

        video_size_bytes = video_stream.filesize
        video_size_mb = video_size_bytes / (1024 * 1024)  # Convert bytes to megabytes

        return f"{video_size_mb:.2f}"
    except Exception as e:
        return f"Error: {e}"


def download_audio_video(link):
    YouTube(
        link, on_complete_callback=on_complete, on_progress_callback=on_progress
    ).streams.get_audio_only().download(output_path=download_path)


def download_path_video(link, path, resolution="360p"):
    YouTube(
        link, on_complete_callback=on_complete, on_progress_callback=on_progress
    ).streams.get_by_resolution(resolution).download(path)


def def_if_down(link, reso):
    if reso == "a":
        YouTube(
            link, on_complete_callback=on_complete, on_progress_callback=on_progress
        ).streams.get_audio_only().download(r"C:\Users\jerom\Downloads")

    elif reso == "1080p" or reso == "720p" or reso == "360p":
        YouTube(
            link, on_complete_callback=on_complete, on_progress_callback=on_progress
        ).streams.get_by_resolution(reso).download(r"C:\Users\jerom\Downloads")

    elif reso == "480p" or reso == "240p":
        download_video(link, "360p")

    else:
        print(Fore.LIGHTRED_EX + f'\nError: "{reso}" this resolution does not found!')
        print(
            Fore.LIGHTYELLOW_EX
            + 'Help: Check if video supports this resolution or if you don\'t write "p" after number of resolution \033[39m \n'
        )


# window function
def word_window(keyword):
    is_True = True
    inputs = input(f'write "{keyword}" to quit file or close the window: ')
    while is_True:
        if inputs == keyword:
            is_True = False
            print("ok")
        else:
            print(f'please write "{keyword}" to quit or close this window')
            inputs = input(f'write "{keyword}" to quit file: ')


def Enter_pass(keyword):
    is_True = True
    inputs = input(f"Write password to continue: ")
    while is_True:
        if inputs == keyword:
            is_True = False
        else:
            print(Fore.RED + f"Invalid Password! \033[39m")
            inputs = input(f"Password: ")


# function for count letter in lists
def count_letter_inlist(Letter, list):
    counter = [name.lower().count(Letter.lower()) for name in list]
    print(f'Number of "{Letter}" in list =', sum(counter))


def count_words_inlist(word, list):
    counter = list.count(word.lower())
    print(counter)


def add_word_to_list(word, list):
    word_append = [word + " " + name for name in list]
    print(word_append)


def count_list_loop(list):
    for x in range(0, len(list)):
        list[x] = str(x + 1) + ". " + list[x]
        print(list[x])


def count_list_loop_W2List(list, list2, add_word):
    for x in range(0, len(list)):
        list[x] = str(x + 1) + ". " + list[x] + ": " + str(list2[x]) + f" {add_word}"
        print(list[x])


# vid = "https://www.youtube.com/watch?v=_8i3beSh9FY"
