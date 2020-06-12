import os
import fasttext
import contextlib
fasttext.FastText.eprint = print

with open(os.devnull, "w") as f, contextlib.redirect_stdout(f):
    DIR = os.path.dirname(os.path.realpath(__file__))
    model = fasttext.load_model(
        DIR + '/sentimenAnalysis2.bin')
print(model.predict("어머니 아성에 도전", k=1))
print(model.predict("그는 못생기다", k=1))
