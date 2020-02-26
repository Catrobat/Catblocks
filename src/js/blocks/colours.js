import Blockly from "scratch-blocks";

Blockly.Colours.overrideColours({
  control: { primary: "#FFAB19", secondary: "#EC9C13", tertiary: "#CF8B17" },
  data: { primary: "#FF6680", secondary: "#FF4D6A", tertiary: "#FF3355" },
  data_lists: { primary: "#FFBF00", secondary: "#E6AC00", tertiary: "#CC9900" },
  event: { primary: "#FF661A", secondary: "#FF5500", tertiary: "#E64D00" },
  looks: { primary: "#59C059", secondary: "#46B946", tertiary: "#389438" },
  more: { primary: "#FF8C1A", secondary: "#FF8000", tertiary: "#DB6E00" },
  motion: { primary: "#4C97FF", secondary: "#4280D7", tertiary: "#3373CC" },
  operators: { primary: "#CF63CF", secondary: "#C94FC9", tertiary: "#BD42BD" },
  pen: { primary: "#0fBD8C", secondary: "#0DA57A", tertiary: "#0B8E69" },
  sensing: { primary: "#5CB1D6", secondary: "#47A8D1", tertiary: "#2E8EB8" },
  sounds: { primary: "#9966FF", secondary: "#855CD6", tertiary: "#774DCB" },
  stitch: { primary: "#BC4793", secondary: "#bb3a8d", tertiary: "#b72a86" }
});

Blockly.Colours["arduino"] = { primary: "#34c8a5", secondary: "#31bc9c", tertiary: "#238770" };
Blockly.Extensions.register("colours_arduino", Blockly.ScratchBlocks.VerticalExtensions.colourHelper("arduino"));

Blockly.Colours["lego"] = { primary: "#cbca3e", secondary: "#d2d140", tertiary: "#acab34" };
Blockly.Extensions.register("colours_lego", Blockly.ScratchBlocks.VerticalExtensions.colourHelper("lego"));

Blockly.Colours["drone"] = { primary: "#91d149", secondary: "#7bb13e", tertiary: "#669334" };
Blockly.Extensions.register("colours_drone", Blockly.ScratchBlocks.VerticalExtensions.colourHelper("drone"));

Blockly.Colours["stitch"] = { primary: "#BC4793", secondary: "#bb3a8d", tertiary: "#b72a86" };
Blockly.Extensions.register("colours_stitch", Blockly.ScratchBlocks.VerticalExtensions.colourHelper("stitch"));