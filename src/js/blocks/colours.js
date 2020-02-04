import Blockly from "scratch-blocks";

Blockly.Colours.overrideColours({
  control: { primary: "#FFAB19", secondary: "#e39613", tertiary: "#CF8B17" },
  data: { primary: "#FF6680", secondary: "#ce4562", tertiary: "#FF3355" },
  data_lists: { primary: "#FFBF00", secondary: "#e6ac00", tertiary: "#CC9900" },
  event: { primary: "#FF661A", secondary: "#d44c00", tertiary: "#E64D00" },
  looks: { primary: "#59C059", secondary: "#3c943c", tertiary: "#389438" },
  more: { primary: "#FF8C1A", secondary: "#FF8000", tertiary: "#DB6E00" },
  motion: { primary: "#4C97FF", secondary: "#386bb8", tertiary: "#3373CC" },
  operators: { primary: "#CF63CF", secondary: "#C94FC9", tertiary: "#BD42BD" },
  pen: { primary: "#0fBD8C", secondary: "#0b8965", tertiary: "#0B8E69" },
  sensing: { primary: "#5CB1D6", secondary: "#47A8D1", tertiary: "#2E8EB8" },
  sounds: { primary: "#9966FF", secondary: "#6c51b4", tertiary: "#774DCB" }
});

Blockly.Colours["arduino"] = { primary: "#34c8a5", secondary: "#299377", tertiary: "#238770" };
Blockly.Extensions.register("colours_arduino", Blockly.ScratchBlocks.VerticalExtensions.colourHelper("arduino"));

Blockly.Colours["lego"] = { primary: "#cbca3e", secondary: "#aead38", tertiary: "#acab34" };
Blockly.Extensions.register("colours_lego", Blockly.ScratchBlocks.VerticalExtensions.colourHelper("lego"));

Blockly.Colours["drone"] = { primary: "#91d149", secondary: "#6d9c36", tertiary: "#669334" };
Blockly.Extensions.register("colours_drone", Blockly.ScratchBlocks.VerticalExtensions.colourHelper("drone"));