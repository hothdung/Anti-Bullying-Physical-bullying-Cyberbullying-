import re
import speech_recognition as sr
import json
import time
from datetime import datetime, date, time, timedelta
import wave
import contextlib
import sys
reload(sys)
sys.setdefaultencoding('utf-8')


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
    # arr = ["public/uploads/test2.wav", "2020-05-11 16:04:22"]
    for item in lines:
        arr.append(item)

    # print(arr)
    audio = arr[0]
    timestamp_begin = datetime.strptime(arr[1], '%Y-%m-%d %H:%M:%S')
    with contextlib.closing(wave.open(audio, 'r')) as f:
        frames = f.getnframes()
        rate = f.getframerate()
        # duration should be in seconds
        duration = frames / float(rate)
    with sr.AudioFile(audio) as source:
        audio = r.record(source)
    try:
        text = r.recognize_google(audio, language='ko-kr')
    except Exception as e:
        print(e)
    result = {'begin': timestamp_begin, 'end': timestamp_begin +
              timedelta(0, duration), 'audio_text': text}
    print(json.dumps(result, default=myconverter,
                     ensure_ascii=False).encode('utf8'))


def main():
    convertToString()


if __name__ == '__main__':
    main()
