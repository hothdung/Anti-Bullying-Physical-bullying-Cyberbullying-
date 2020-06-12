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
DIR = os.path.dirname(os.path.realpath(__file__)) # insert your own folder path to kosac file

# Read Raw Corpus data
dat = pd.read_csv(DIR + '/corpus.csv')

# Rename Columns to snake case
dat.columns = [
    re.sub('^_|_$', '', re.sub('\\W+', '_', column))
    for column in dat.columns
]

# Select sentiment columns and raw sentence
dat = dat[[
    'polarity'
    , 'intensity'
    , 'subjectivity_type'
    , 'subjectivity_polarity'
    , 'raw_sentence'
    , 'confident'
]]

# Filter for High Confidence
dat = dat[dat['confident']==True]

# Exclude NaN and None values
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
dat.raw_sentence = dat.raw_sentence.map(lambda text: re.sub('^ | $', '', re.sub('\\W+', ' ', text)))

# Label FastText columns
# Using p, i, subt, and subp to distinguish in FT output
dat.polarity = '__label__p_' + dat.polarity
dat.intensity = '__label__i_' + dat.intensity
dat.subjectivity_type = '__label__subt_' + dat.subjectivity_type
dat.subjectivity_polarity = '__label__subp_' + dat.subjectivity_polarity

# Remove Confident column
dat = dat.drop('confident', 1)

# Randomly Split into Training and Test Sets (80/20)
# Training Data 80% (sample without replacement)
train = dat.sample(frac=.8, replace=False)

# Testing Data 20% (select data not in training)
test = dat.loc[list(set(dat.index) - set(train.index))]

# Write training data to tsv files
train.to_csv(
    DIR + '/corpus_ft.train'
    , header=False
    , index=False
    , sep='\t'
)

test.to_csv(
    DIR + '/corpus_ft.test'
    , header=False
    , index=False
    , sep='\t'
)

# Train the Model
# Manual Tuning (ie trial and error)
model = fasttext.train_supervised(
    DIR + '/corpus_ft.train'
    , lr=1.0
    , epoch=25
    , wordNgrams=3
    , bucket=200000
    , dim=50
    , loss='ova'
)

# Test Manual Model
results = model.test(DIR + '/corpus_ft.test', k=4, threshold=0.7)
print(results)

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
    DIR + '/corpus_ft.dat'
    , header=False
    , index=False
    , sep='\t'
)

# Re-Train on Entire Dataset
# Manual Method
# Train Model on Entire Dataset
model = fasttext.train_supervised(
    DIR + '/corpus_ft.dat'
    , lr=1.0
    , epoch=25
    , wordNgrams=3
    , bucket=200000
    , dim=50
    , loss='ova'
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


# Check Model output
print(model.predict('그들은 못 생겼어', k=4))
print(model.predict('너는 못 생겼어', k=4))
print()
print(model.predict('그들은 못 생겼어', k=4))
print(model.predict('김석원씨는 깔끔하고 정돈된 옷입기로, 김한길씨는 캐주얼한 옷을 자기 것으로 소화해내는 감각을 평가받았다',k=4))
