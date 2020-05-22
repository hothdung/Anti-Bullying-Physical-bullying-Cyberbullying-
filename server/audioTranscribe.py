import re
import speech_recognition as sr
import json
import sys
reload(sys)
sys.setdefaultencoding('utf-8')


def read_in():
    lines = sys.stdin.readlines()
    return json.loads(lines[0])


def convertToString():
    lines = read_in()
    audio = lines
    r = sr.Recognizer()
    text = ""

    with sr.AudioFile(audio) as source:
        audio = r.record(source)
    try:
        text = r.recognize_google(audio, language='ko-kr')
    except Exception as e:
        print(e)

    print(text)


def main():
    convertToString()


if __name__ == '__main__':
    main()
