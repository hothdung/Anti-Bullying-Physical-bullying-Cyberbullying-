import speech_recognition as sr

audio = 'test6.wav'

r = sr.Recognizer()

with sr.AudioFile(audio) as source:
    audio = r.record(source)
    print("Converting Audio File To Text...")

    try:
        text = r.recognize_google(audio, language='ko-kr')
        print(text)
        text_file = open("test6.txt", "w")
        n = text_file.write(text)
        text_file.close()

    except Exception as e:
        print(e)
