import { NextApiRequest, NextApiResponse } from "next";
import { promises as fs } from "fs";

// Function to locate JSON file
import { locate } from "@iconify/json";

// Various functions from Iconify Utils
import { parseIconSet } from "@iconify/utils/lib/icon-set/parse";
import { iconToSVG } from "@iconify/utils/lib/svg/build";
// import { defaults } from "@iconify/utils/lib/customisations";

type Data = {
  name: string;
};

export default function handleTest(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // Locate icons
  const filename = locate("ant-design");

  console.log("ttt:");
  const converted = async () => {
    // Load icon set
    const icons = JSON.parse(await fs.readFile(filename, "utf8"));

    // Parse all icons
    const exportedSVG: Record<string, string> = Object.create(null);
    parseIconSet(icons, (iconName, iconData) => {
      if (!iconData) {
        // Invalid icon
        console.error(`Error parsing icon ${iconName}`);
        return;
      }

      // Render icon
      const renderData = iconToSVG(iconData, {
        // ...defaults,
        height: "auto",
      });

      // Generate attributes for SVG element
      const svgAttributes: Record<string, string> = {
        xmlns: "http://www.w3.org/2000/svg",
        "xmlns:xlink": "http://www.w3.org/1999/xlink",
        ...renderData.attributes,
      };
      const svgAttributesStr = Object.keys(svgAttributes)
        .map(
          (attr) =>
            // No need to check attributes for special characters, such as quotes,
            // they cannot contain anything that needs escaping.
            `${attr}="${svgAttributes[attr as keyof typeof svgAttributes]}"`
        )
        .join(" ");

      // Generate SVG
      const svg = `<svg ${svgAttributesStr}>${renderData.body}</svg>`;
      exportedSVG[iconName] = svg;
    });

    // Output directory
    const outputDir = "./public/antd";
    try {
      await fs.mkdir(outputDir, {
        recursive: true,
      });
    } catch (err) {
      //
    }

    // Save all files
    const filenames = Object.keys(exportedSVG);
    for (let i = 0; i < filenames.length; i++) {
      const filename = filenames[i];
      const svg = exportedSVG[filename];
      await fs.writeFile(outputDir + "/" + filename + ".svg", svg, "utf8");
    }
  };

  converted();

  res.status(200).json({ name: filename as string });
}
