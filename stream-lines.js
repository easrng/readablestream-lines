export default async function* streamLines(stream) {
  let buf = "";
  const reader = stream.pipeThrough(new TextDecoderStream()).getReader();
  let current;
  while ((current = await reader.read())) {
    if (current.done) {
      if (buf) yield buf;
      return;
    } else {
      for (let i = 0; i < current.value.length; i++) {
        if (current.value[i] == "\n") {
          yield buf;
          buf = "";
        } else {
          buf += current.value[i];
        }
      }
    }
  }
}
