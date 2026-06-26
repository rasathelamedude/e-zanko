const fs = require("fs");
const path = require("path");

const projectRoot = __dirname;
const sourceRoot = path.join(projectRoot, "src");

const localeFiles = {
  en: path.join(sourceRoot, "locales", "en", "translation.json"),
  ar: path.join(sourceRoot, "locales", "ar", "translation.json"),
  ku: path.join(sourceRoot, "locales", "ku", "translation.json"),
};

const codeExtensions = new Set([".ts", ".tsx", ".js", ".jsx"]);

function walkCodeFiles(directory, files = []) {
  if (!fs.existsSync(directory)) return files;

  const entries = fs.readdirSync(directory, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      if (["locales", "node_modules", "dist"].includes(entry.name)) continue;

      walkCodeFiles(fullPath, files);
      continue;
    }

    if (codeExtensions.has(path.extname(entry.name))) {
      files.push(fullPath);
    }
  }

  return files;
}

function extractTranslationKeys(content) {
  const keys = new Set();

  // Matches static translations:
  // t("Logout"), t('Logout'), t(`Logout`)
  // Does not extract dynamic values such as t(`Hello ${name}`)
  const translationPattern = /\bt\s*\(\s*(["'`])((?:\\.|[\s\S])*?)\1/g;

  let match;

  while ((match = translationPattern.exec(content))) {
    const quote = match[1];
    const rawKey = match[2];

    if (quote === "`" && rawKey.includes("${")) continue;

    const key = rawKey.trim().replace(/\\(["'`\\])/g, "$1");

    if (key) {
      keys.add(key);
    }
  }

  return keys;
}

function readJson(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing locale file: ${filePath}`);
  }

  const content = fs.readFileSync(filePath, "utf8");
  const parsed = JSON.parse(content);

  if (typeof parsed !== "object" || Array.isArray(parsed) || parsed === null) {
    throw new Error(`Locale file must contain a JSON object: ${filePath}`);
  }

  return parsed;
}

function writeJson(filePath, data) {
  fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
}

function main() {
  const sourceFiles = walkCodeFiles(sourceRoot);
  const allKeys = new Set();

  for (const filePath of sourceFiles) {
    const content = fs.readFileSync(filePath, "utf8");

    for (const key of extractTranslationKeys(content)) {
      allKeys.add(key);
    }
  }

  const keys = [...allKeys].sort((a, b) => a.localeCompare(b));

  if (keys.length === 0) {
    console.log("No static t() keys found.");
    return;
  }

  console.log(`Found ${keys.length} translation key(s).`);

  for (const [language, filePath] of Object.entries(localeFiles)) {
    const translations = readJson(filePath);
    let addedCount = 0;

    for (const key of keys) {
      if (Object.prototype.hasOwnProperty.call(translations, key)) {
        continue;
      }

      translations[key] = language === "en" ? key : "";
      addedCount += 1;
    }

    if (addedCount > 0) {
      writeJson(filePath, translations);
    }

    console.log(`${language}: added ${addedCount} key(s).`);
  }
}

main();
