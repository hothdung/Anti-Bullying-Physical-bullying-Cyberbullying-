import re
import speech_recognition as sr
import json
import time
from datetime import datetime, date, time, timedelta
import wave
import contextlib
import sys
# from importlib import reload
# reload(sys)
# sys.setdefaultencoding


def read_in():
    lines = sys.stdin.readlines()
    return json.loads(lines[0])


def myconverter(o):
    if isinstance(o, datetime):
        return o.__str__()


def convertToString():
    lines = read_in()
    r = sr.Recognizer()
    text = ""
    duration = 0.0
    arr = []
    # testing
    # arr = ["public/uploads/test2.wav", "2020-05-27 16:48:46"]
    for item in lines:
        arr.append(item)
    # print(arr)
    audio = arr[0]
    try:
        with sr.AudioFile(audio) as source:
            audio = r.record(source)
        text = r.recognize_google(audio, language='ko-kr')
    except Exception as e:
        text = "non-transcribable"
        print(e)
    #     arr.append(item)
    print(text)
    # result = {'audio_text': text}
    # # print(json.dumps(result, default=myconverter,
    #                  ensure_ascii = False))
    # lines = read_in()
    # arr = []
    # for item in lines:
    #     arr.append(item)


def main():
    convertToString()


if __name__ == '__main__':
    main()
