from powerful import download_video, download_audio_video
import sys

if __name__ == "__main__":
    url = sys.argv[1]
    reso = sys.argv[2]
    if reso == "audio":
        download_audio_video(url)
    else:
        download_video(url, reso)
