import linesIterator from "./lines-iterator.js";
const { body } = new Response("{}\n".repeat(1000000));
const array = [];
for await (let line of linesIterator(body)) {
  array.push(JSON.parse(line));
}
if (array.length == 1000000) {
  console.log("test passed!")
} else {
  console.error("test failed")
  process.exit(1)
}
