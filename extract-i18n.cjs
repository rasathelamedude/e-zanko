const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "src");
const outDir = path.join(root, "locales", "en");
const exts = [".tsx", ".ts", ".jsx", ".js", ".html"];

function walk(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const res = path.join(dir, e.name);
    if (e.isDirectory()) walk(res, files);
    else if (exts.includes(path.extname(res))) files.push(res);
  }
  return files;
}

function isLikelyUIString(str) {
  if (!str) return false;
  const s = str.trim();
  if (s.length < 2) return false;
  if (s.length > 200) return false;
  if (/[<>{}=;`$/\\]/.test(s)) return false;
  if (/^https?:\/\//.test(s)) return false;
  if (/^[0-9\s:,-]+$/.test(s)) return false;
  if (/^[a-z0-9-_]+$/i.test(s)) return false;
  return true;
}

function extractFromContent(content) {
  const found = new Set();

  const tagTextRegex = />\s*([^<>{}][^<>{}]*)\s*</g;
  let m;
  while ((m = tagTextRegex.exec(content))) {
    const s = m[1].trim();
    if (isLikelyUIString(s)) found.add(s);
  }

  const attrRegex =
    /(?:placeholder|alt|title|aria-label|aria-labelledby|aria-describedby|label|value)=['`"]([^'"`]{2,200})['`"]/gi;
  while ((m = attrRegex.exec(content))) {
    const s = m[1].trim();
    if (isLikelyUIString(s)) found.add(s);
  }

  const strLitRegex =
    /(?:const|let|var|export)\s+[A-Za-z0-9_$]+\s*[:=][\s\S]*?['`"]([^'"`]{2,200})['`"]/g;
  while ((m = strLitRegex.exec(content))) {
    const s = m[1].trim();
    if (isLikelyUIString(s)) found.add(s);
  }

  return Array.from(found);
}

function main() {
  const files = walk(root);
  const all = new Set();
  for (const f of files) {
    const content = fs.readFileSync(f, "utf8");
    const items = extractFromContent(content);
    for (const it of items) all.add(it);
  }

  const indexHtml = path.join(__dirname, "index.html");
  if (fs.existsSync(indexHtml)) {
    const content = fs.readFileSync(indexHtml, "utf8");
    const items = extractFromContent(content);
    for (const it of items) all.add(it);
  }

  const arr = Array.from(all).sort((a, b) => a.localeCompare(b));
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const outObj = {};
  for (const s of arr) outObj[s] = s;

  const outPath = path.join(outDir, "translation.json");
  fs.writeFileSync(outPath, JSON.stringify(outObj, null, 2), "utf8");

  console.log(`Found ${arr.length} candidate strings. Written to ${outPath}`);
}

main();
