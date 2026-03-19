const folder = process.argv[2];

try {
  await import(`./${folder.padStart(2, "0")}/index.js`);
} catch {
  console.error("day not available :/");
}
