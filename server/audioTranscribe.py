import speech_recognition as sr
import sys
import json


def read_in():
    lines = sys.stdin.readLines()
    return json.loads(lines[0])


def convertToString():
    print("Here in python method!")
    lines = read_in()
    audio = lines
    r = sr.Recognizer()
    text = ""

    with sr.AudioFile(audio) as source:
        audio = r.record(source)
        print("Converting Audio File To Text...")
    try:
        text = r.recognize_google(audio, language='ko-kr')
        print(text)
        # text_file = open("test6.txt", "w")
        # n = text_file.write(text)
        # text_file.close()
    except Exception as e:
        print(e)
    return text


def main():
    convertToString()


if __name__ == '__main__':
    main()
