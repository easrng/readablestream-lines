import fn from "./index.js";
const { body } = new Response("{}\n".repeat(1000000));
const array = [];
for await (let line of fn(body)) {
  array.push(JSON.parse(line));
}
if (array.length == 1000000) {
  console.log("test passed!")
} else {
  console.error("test failed")
  process.exit(1)
}
