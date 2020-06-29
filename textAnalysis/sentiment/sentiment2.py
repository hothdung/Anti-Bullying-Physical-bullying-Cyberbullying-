# -*- coding: utf-8 -*-
import fasttext
import pandas as pd
import math
import re
import os
import sys
reload(sys)
sys.setdefaultencoding('utf-8')

# Folder Location
DIR = os.path.dirname(os.path.realpath(__file__))

# Read Raw Corpus data
dat = pd.read_csv(DIR + '/kosacCorpus.csv')

# column labels of data frame
# Rename Columns to snake case
dat.columns = [
    re.sub('^_|_$', '', re.sub('\\W+', '_', column))
    for column in dat.columns
]

# Select sentiment columns and raw sentence
dat = dat[[
    'polarity', 'intensity', 'subjectivity_type', 'subjectivity_polarity', 'raw_sentence', 'confident'
]]

# Filter for High Confidence
dat = dat[dat['confident'] == True]

# Exclude NaN and None values
# values are missing?
dat = dat[
    (
        pd.isnull(dat.polarity) == False
        | dat.polarity.str.contains('None')
    )
    & (
        pd.isnull(dat.intensity) == False
        | dat.intensity.str.contains('None')
    )
    & (
        pd.isnull(dat.subjectivity_type) == False
    )
    & (
        pd.isnull(dat.subjectivity_polarity) == False
    )
]

# Clean Sentences by Removing Symbols
dat.raw_sentence = dat.raw_sentence.map(
    lambda text: re.sub('^ | $', '', re.sub('\\W+', ' ', text)))

# Label FastText columns
# Using p, i, subt, and subp to distinguish in FT output
dat.polarity = '__label__p_' + dat.polarity
# dat.intensity = '__label__i_' + dat.intensity
# dat.subjectivity_type = '__label__subt_' + dat.subjectivity_type
# dat.subjectivity_polarity = '__label__subp_' + dat.subjectivity_polarity

# Remove Confident column
dat = dat.drop('confident', 1)

# Randomly Split into Training and Test Sets (80/20)
# Training Data 80% (sample without replacement)
# train = dat.sample(frac=.8, replace=False)
train = dat.sample(frac=.8, replace=False).sort_index()

# Testing Data 20% (select data not in training)
test = dat.loc[list(set(dat.index) - set(train.index))].sort_index()

# Write training data to tsv files
train.to_csv(
    DIR + '/corpus_ft.train', header=False, index=False, sep='\t'
)

test.to_csv(
    DIR + '/corpus_ft.test', header=False, index=False, sep='\t'
)

# Train the Model
# Manual Tuning (ie trial and error)
model = fasttext.train_supervised(
    DIR + '/corpus_ft.train', lr=1.0, epoch=25, wordNgrams=3, bucket=200000, dim=50, loss='ova'
)


def print_results(N, p, r):
    print("N\t" + str(N))
    print("P@{}\t{:.3f}".format(1, p))
    print("R@{}\t{:.3f}".format(1, r))


# Test Manual Model
results = model.test(DIR + '/corpus_ft.test', k=4, threshold=0.7)
print(results)

print_results(*model.test(DIR + '/corpus_ft.test'))

# Train the Model with Auto-Tuning
# # Auto-Tunes parameters (gets the best parameters for the above parameters like lr, wordNgrams, etc.)
# automodel = fasttext.train_supervised(
#         DIR + '/corpus_ft.train'
#     , autotuneValidationFile=DIR + '/corpus_ft.test'
#     , autotuneDuration=300 # Tune for 5 minutes
# 	, autotuneMetric="f1:__label__p_NEG" # Autotune to optimize for Negative polarity
# )
#
# # Test Automatd Model
# autoresults = model.test(DIR + '/corpus_ft.test', k=4, threshold=0.7)
# print(autoresults)

# Write Entire data to tsv files
dat.to_csv(
    DIR + '/corpus_ft.dat', header=False, index=False, sep='\t'
)

# Re-Train on Entire Dataset
# Manual Method
# Train Model on Entire Dataset
model = fasttext.train_supervised(
    DIR + '/corpus_ft.dat', lr=1.0, epoch=25, wordNgrams=3, bucket=20000, dim=50, loss='ova'
)

# # Auto-Tunes parameters
# automodel = fasttext.train_supervised(
#         DIR + '/corpus_ft.dat'
#     , autotuneValidationFile=DIR + '/corpus_ft.test'
#     , autotuneDuration=300 # Tune for 5 minutes
# 	, autotuneMetric="f1:__label__p_NEG" # Autotune to optimize for Negative polarity
# )

# Choose Model to Save
# <model_here>.save_model(DIR + '/sentiment_predictor.bin')

# To load saved model use:
# fasttext.load_model(DIR + '/sentiment_predictor.bin')

model.save_model("sentimenAnalysis2.bin")
print(model.predict("안 한다고! 미친. 하지마. 너야 신동우 너 누나 11시까지 잤을 것 같으면 그 다음에 여행가라 질러하지마 질러자지마 진짜 네가 돕지 않았잖아 네가 돕고 안 하잖아 네가 솔직히 집에서 뭘 도와주는 거 있어? 걸어가. 맨날 걸아가. 미친 걸어갈걸. 걸어가. 너가 11시까지 잤으지마 진짜. 렌트타고 가고! 렌트타고 가 그냥", k=1))
print(model.predict("인생이 의미가 없다", k=1))
print(model.predict(
    "저는 잘 맞아요. 사람마다 좀 다르긴 한데 저는 잘 맞는 것 같아요. 사람들이 한약 별로 안 좋더라고요. 진짜 도움이 되냐? 맞아요. ", k=1))
