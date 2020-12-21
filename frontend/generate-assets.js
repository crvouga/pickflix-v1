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
  console.log("started generating assets");

  const [iconAssets, splashAssets] = await Promise.all([
    //
    pwaAssetGenerator.generateImages(
      "public/assets/icon.png",
      "public/assets",
      {
        background: palette.default,
        log: false,
        iconOnly: true,
        pathOverride: "assets",
      }
    ),
    //
    pwaAssetGenerator.generateImages(
      "public/assets/logo.png",
      "public/assets",
      {
        background: palette.default,
        log: false,
        splashOnly: true,
        pathOverride: "assets",
      }
    ),
  ]);

  console.log("generated image assets");

  const webManifest = {
    ...manifestTemplate,
    background_color: backgroundColor,
    theme_color: themeColor,
    icons: iconAssets.manifestJsonContent,
  };

  const manifestMetaHtml = `
    <link rel="manifest" href="manifest.json">
    <meta name="theme-color" content=${themeColor}>
    <meta name="background-color" content=${backgroundColor}>
  `;

  fs.writeFileSync(
    "./public/manifest.json",
    JSON.stringify(webManifest, null, 2),
    {}
  );

  console.log("generated web manifest");

  const indexHtmlTemplate = fs.readFileSync("./public/index.template.html");
  const dom = new jsdom.JSDOM(indexHtmlTemplate);
  const document = dom.window.document;
  const headNode = document.getElementsByTagName("head")[0];

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

  headNode.insertAdjacentHTML("beforeend", manifestMetaHtml);

  const indexHtml = dom.serialize();

  fs.writeFileSync("./public/index.html", indexHtml, {});

  console.log("generated index.html");
};

generateAssets();
