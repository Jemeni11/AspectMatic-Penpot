import { PluginMessageEvent } from "./types";
import { copyToClipboard, getAspectRatio } from "./helpers";

penpot.ui.open("AspectMatic", "", {
  width: 350,
  height: 550,
});

penpot.ui.onMessage<PluginMessageEvent>((message) => {
  // const selection = penpot.selection;
  // console.log("PenPot Selection:", selection);
  // console.log("Message: ", message);
  // console.log("Message Type: ", message.type);
  // console.log("Message Content: ", message.content);

  // if (selection.length === 0) {
  //   alert("No object selected");
  //   console.log("No object selected");
  // } else {
  //   const aspectRatiosArray: AspectRatioWithFormats[] = [];

  //   for (const selectedObj of selection) {
  //     const width = selectedObj.width;
  //     const height = selectedObj.height;
  //     const allARs = formatAspectRatio(width, height);

  //     const aspectRatioObject: AspectRatioWithFormats = {
  //       nodeName:
  //         selectedObj.name.length > 12
  //           ? selectedObj.name.substring(0, 12) + "..."
  //           : selectedObj.name,
  //       width,
  //       height,
  //       ...allARs,
  //     };

  //     aspectRatiosArray.push(aspectRatioObject);
  //   }

  //   penpot.ui.sendMessage({
  //     type: "SUCCESS",
  //     content: aspectRatiosArray,
  //   });
  // }
  if (message.type === "ASPECT_RATIO_CALCULATION") {
    getAspectRatio();
  } else if (message.type === "COPY_TO_CLIPBOARD") {
    copyToClipboard(message.content as string);
  } else if (message.type === "CLOSE_UI") {
    penpot.closePlugin();
  }
});
