function loadArrayBuffer(url) {
  const request = new XMLHttpRequest();
  request.open("GET", url, true);
  request.responseType = "arraybuffer";

  return new Promise((resolve, reject) => {
    // TODO: More comprehensive network error handling
    request.onload = () => resolve(request.response);
    request.onerror = () => reject(request);
    request.send();
  });
}

function decodeAudioData(audioContext, arrayBuffer) {
  return new Promise((resolve, reject) => {
    const onDecodeError = () => reject('Error decoding audio');
    const onDecodeResponse = (buffer) => buffer &&
      resolve(buffer) || onDecodeError();

    audioContext.decodeAudioData(
      arrayBuffer,
      onDecodeResponse,
      onDecodeError
    );
  });
}

export async function getDecodedAudioDataFromUrl(audioContext, url) {
  try {
    const arrayBuffer = await loadArrayBuffer(url);
    const decodedAudio = await decodeAudioData(audioContext, arrayBuffer);
    return decodedAudio;

  } catch(err) {
    // TODO: Implement logging class
    console.error(err);
  }
}

export function connectNewBufferSource(audioContext, decodedAudioArrayBuffer) {
  const source = audioContext.createBufferSource();
  source.playbackRate.value = 0.75;
  source.buffer = decodedAudioArrayBuffer;

  source.connect(audioContext.destination);
  return source;
}
