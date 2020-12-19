const fs = require("fs");
//DOCS: https://github.com/onderceylan/pwa-asset-generator
const pwaAssetGenerator = require("pwa-asset-generator");
//DOCS: https://github.com/jsdom/jsdom#readme
const jsdom = require("jsdom");
const palette = require("./src/palette.json");
const manifestTemplate = require("./public/manifest.template.json");

/* 


*/

const backgroundColor = palette.paper;
const themeColor = palette.primary;

/* 


*/

const generateAssets = async () => {
  console.log("started generating image assets");

  const iconAssets = await pwaAssetGenerator.generateImages(
    "public/assets/icon.png",
    "public/assets/generated",
    {
      background: palette.default,
      pathOverride: "assets/generated",
      log: false,
      iconOnly: true,
    }
  );

  const splashAssets = await pwaAssetGenerator.generateImages(
    "public/assets/logo.png",
    "public/assets/generated",
    {
      background: palette.default,
      pathOverride: "assets/generated",
      log: false,
      splashOnly: true,
    }
  );

  console.log("finished generating image assets");

  console.log("started generating web manifest");

  const manifest = {
    ...manifestTemplate,
    background_color: backgroundColor,
    theme_color: themeColor,
    icons: iconAssets.manifestJsonContent,
  };

  const manifestMetaHtml = `<link rel="manifest" href="manifest.json">`;

  fs.writeFileSync("./public/manifest.json", JSON.stringify(manifest), {});

  console.log("finished generating web manifest");

  console.log("started generating index.html");

  const indexHtmlTemplate = fs.readFileSync("./public/index.template.html");
  const dom = new jsdom.JSDOM(indexHtmlTemplate);
  const document = dom.window.document;
  const headNode = document.getElementsByTagName("head")[0];

  headNode.insertAdjacentHTML("beforeend", manifestMetaHtml);

  for (const key in iconAssets.htmlMeta) {
    const html = iconAssets.htmlMeta[key];
    if (html) {
      headNode.insertAdjacentHTML("beforeend", html);
    }
  }

  for (const key in splashAssets.htmlMeta) {
    const html = splashAssets.htmlMeta[key];
    if (html) {
      headNode.insertAdjacentHTML("beforeend", html);
    }
  }

  const indexHtml = dom.serialize();

  fs.writeFileSync("./public/index.html", indexHtml, {});

  console.log("finished generating index.html");
};

generateAssets();
