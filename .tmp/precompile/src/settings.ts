module powerbi.extensibility.visual.flatpercent4542516F697944D4BA75699C96A7D2E6  {
  "use strict";
  import DataViewObjectsParser = powerbi.extensibility.utils.dataview.DataViewObjectsParser;

  export class VisualSettings extends DataViewObjectsParser {
    public flatpercent: flatPercentSettings = new flatPercentSettings();
    public vor: VorSettings = new VorSettings();
  }

  export class Margin {
    constructor() { }

    public top: number = 20;
    public right: number = 20;
    public bottom: number = 20;
    public left: number = 20;
  }
  
  export class flatPercentSettings {
    public defaultColor: string = "#E91E63";
    public textcolor: string = "#E91E63";
    public emptyColor: string = "#fff";
    public fontSize: number = 13;
    public multiplier: boolean = true;
    public arcsize: number = 4;
  }

  export class VorSettings {
    public Activated: boolean = false;
    public Lowcolor: string = "red";
    public MiddleColor: string = "orange";
    public HighColor: string = "green";
    public FixedValues: boolean = true;
    public FirstValue: number = 25;
    public SecondValue: number = 75;
  }
}
