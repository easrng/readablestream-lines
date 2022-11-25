export default async function* streamLines(stream, decode = true) {
  if (decode) stream = stream.pipeThrough(new TextDecoderStream());
  const reader = stream.getReader();
  let buffer = "";
  let current;
  while ((current = await reader.read())) {
    if (current.done) {
      if (buffer) yield buffer;
      return;
    } else {
      for (let i = 0; i < current.value.length; i++) {
        if (current.value[i] == "\n") {
          yield buffer;
          buffer = "";
        } else {
          buffer += current.value[i];
        }
      }
    }
  }
}
