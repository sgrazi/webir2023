import os
import random
import pandas as pd


file_path = './song_lyrics.csv' # 9gb file, 5063837 unique values
# https://www.kaggle.com/datasets/carlosgdcj/genius-song-lyrics-with-language-information/
chunk_size = 100000  # 100,000 rows per chunk
result_df = pd.DataFrame()

for chunk in pd.read_csv(file_path, chunksize=chunk_size):
    print("chunk ")
    columns_to_drop = ["tag", "features", "id", "language_cld3", "language_ft", "language"]
    chunk = chunk.drop(columns=columns_to_drop)

    # Select 1000 random rows
    sample_size = 1000
    random_indices = random.sample(range(len(chunk)), sample_size)
    chunk = chunk.iloc[random_indices]

    result_df = pd.concat([result_df, chunk], ignore_index=True)


# Save the resulting DataFrame to a CSV file
result_df.to_csv('short_song_lyrics.csv', index=False)