module powerbi.extensibility.visual {
  "use strict";
  import DataViewObjectsParser = powerbi.extensibility.utils.dataview.DataViewObjectsParser;

  export class VisualSettings extends DataViewObjectsParser {
    public flatpercent: FlatPercentSettings = new FlatPercentSettings();
    public vor: VorSettings = new VorSettings();
  }

  export class Margin {
    constructor() { }

    public top: number = 20;
    public right: number = 20;
    public bottom: number = 20;
    public left: number = 20;
  }

  export class FlatPercentSettings {
    public defaultColor: string = "#E91E63";
    public textColor: string = "#E91E63";
    public emptyColor: string = "#fff";
    public fontSize: number = 13;
    public multiplier: boolean = true;
    public arcSize: number = 4;
  }

  export class VorSettings {
    public show: boolean = false;
    public lowColor: string = "red";
    public middleColor: string = "orange";
    public highColor: string = "green";
    public fixedValues: boolean = true;
    public firstValue: number = 25;
    public secondValue: number = 75;
  }
}
