import type { AspectRatioWithFormats } from "../types";
import formatAspectRatio from "./formatAspectRatio";

export default function getAspectRatio() {
  const selection = penpot.selection;

  if (selection.length === 0) {
    alert("No object selected");
    console.log("No object selected");
  } else {
    const aspectRatiosArray: AspectRatioWithFormats[] = [];

    for (const selectedObj of selection) {
      const width = selectedObj.width;
      const height = selectedObj.height;
      const allARs = formatAspectRatio(width, height);

      const aspectRatioObject: AspectRatioWithFormats = {
        nodeName:
          selectedObj.name.length > 12
            ? selectedObj.name.substring(0, 12) + "..."
            : selectedObj.name,
        width,
        height,
        ...allARs,
      };

      aspectRatiosArray.push(aspectRatioObject);
    }

    penpot.ui.sendMessage({ type: "SUCCESS", content: aspectRatiosArray });
  }
}
