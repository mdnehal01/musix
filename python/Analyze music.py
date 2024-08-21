import librosa
import numpy as np

# Load the audio file
y, sr = librosa.load('nevergrowup.mp3', sr=None)

# Compute RMS energy
rms = librosa.feature.rms(y=y)
energy = np.mean(rms)

# Approximate Loudness (RMS can be a proxy but is not exact)
loudness = np.mean(rms)  # This is a simple approximation

# Tempo
tempo, _ = librosa.beat.beat_track(y=y, sr=sr)

print(f"Energy (approx.): {rms}")
print(f"Loudness (approx.): {loudness}")
print(f"Tempo: {tempo} BPM")
