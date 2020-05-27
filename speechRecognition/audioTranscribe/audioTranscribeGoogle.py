import os
from google.cloud import speech_v1
from google.cloud.speech_v1 import enums
from google.cloud.speech_v1 import types
import io
from google.cloud import storage
bucketname = "audiosnippets"

os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "My ProjectaudioTranscribe-d43920a14471.json"


def upload_blob(bucket_name, source_file_name, destination_blob_name):
    """Uploads a file to the bucket."""
    storage_client = storage.Client()
    bucket = storage_client.get_bucket(bucket_name)
    blob = bucket.blob(destination_blob_name)

    blob.upload_from_filename(source_file_name)


def sample_recognize(local_file_path):
    """
        Transcribe a short audio file using synchronous speech recognition

        Args:
          local_file_path Path to local audio file, e.g. /path/audio.wav
        """
    upload_blob(bucketname, local_file_path, "test2Name")

    gcs_uri = 'gs://' + bucketname + '/' + "test2"
    transcript = ''

    client = speech_v1.SpeechClient()
    audio = types.RecognitionAudio(uri=gcs_uri)

    # local_file_path = 'resources/brooklyn_bridge.raw'

    # The language of the supplied audio
    language_code = "ko-kr"

    # Sample rate in Hertz of the audio data sent
    sample_rate_hertz = 16000

    # Encoding of audio data sent. This sample sets this explicitly.
    # This field is optional for FLAC and WAV audio formats.
    encoding = enums.RecognitionConfig.AudioEncoding.LINEAR16
    config = {
        "language_code": "ko-kr",
        "sample_rate_hertz": sample_rate_hertz,
        "encoding": encoding,
    }
    with io.open(local_file_path, "rb") as f:
        content = f.read()
    audio = {"content": content}

    response = client.recognize(config, audio)
    response = operation.result(timeout=10000)

    for result in response.results:
        # First alternative is the most probable result
        alternative = result.alternatives[0]
        print(u"Transcript: {}".format(alternative.transcript))


def main():
    sample_recognize("test2.wav")


if __name__ == '__main__':
    main()
