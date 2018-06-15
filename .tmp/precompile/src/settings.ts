module powerbi.extensibility.visual.flatpercent4542516F697944D4BA75699C96A7D2E5  {
  "use strict";
  import DataViewObjectsParser = powerbi.extensibility.utils.dataview.DataViewObjectsParser;

  export class VisualSettings extends DataViewObjectsParser {
    public flatpercent: flatPercentSettings = new flatPercentSettings();
  }

  export class Margin {
    constructor() { }

    public top: number = 20;
    public right: number = 20;
    public bottom: number = 20;
    public left: number = 20;
  }

  export function parseSettings(dataView: DataView): VisualSettings {
    return VisualSettings.parse(dataView) as VisualSettings;
  }

  export class flatPercentSettings {
    public defaultColor: string = "#E91E63";
    public emptyColor: string = "#fff";
    public fontSize: number = 13;
    public multiplier: boolean = true;
    public arcsize: number = 4;
  }
}
