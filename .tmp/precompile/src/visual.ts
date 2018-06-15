module powerbi.extensibility.visual.flatpercent4542516F697944D4BA75699C96A7D2E6  {
    "use strict";
    export class Visual implements IVisual {
        private settings: VisualSettings;
        private svg: d3.Selection<SVGElement>;
        private gcontainer: d3.Selection<SVGElement>;
        private flatpercent: FlatPercent;

        constructor(options: VisualConstructorOptions) {
            this.svg = d3.select(options.element).append('svg');
            this.gcontainer = this.svg.append('g').classed('percenter', true);
            this.flatpercent = new FlatPercent(this.gcontainer, { top: 35, right: 20, bottom: 20, left: 20 });
        }

        public update(options: VisualUpdateOptions) {
            this.settings = Visual.parseSettings(options && options.dataViews && options.dataViews[0]);
            let value = +options.dataViews[0].categorical.values[0].values[0];

            this.svg.attr({
                height: options.viewport.height,
                width: options.viewport.width
            });

            this.flatpercent.Update(options, value);

            this.svg.selectAll('.titlevalue').remove();
            this.svg.append('g').append('text')
                .style('font-size', '5vw')
                .attr("x", options.viewport.width / 2)
                .attr("y", 20)
                .attr('text-anchor', 'middle')
                // .attr('alignment-baseline', 'middle')
                .style('fill', 'blue')
                .attr('class', 'titlevalue')
                .text('titre du rapport');


        }

        /** 
         * This function gets called for each of the objects defined in the capabilities files and allows you to select which of the 
         * objects and properties you want to expose to the users in the property pane.
         * 
         */
        private static parseSettings(dataView: DataView): VisualSettings {
            return VisualSettings.parse(dataView) as VisualSettings;
        }

        public enumerateObjectInstances(options: EnumerateVisualObjectInstancesOptions): VisualObjectInstance[] | VisualObjectInstanceEnumerationObject {
            return VisualSettings.enumerateObjectInstances(this.settings || VisualSettings.getDefault(), options);
        }
    }
}