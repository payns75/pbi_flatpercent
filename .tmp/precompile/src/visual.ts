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
             let titletext = options.dataViews[0].categorical.values[0].source.displayName;

            this.svg.attr({
                height: options.viewport.height,
                width: options.viewport.width
            });

            this.flatpercent.Update(options, this.settings, value);

            let titlealign = 1;
            let titlex = 0;
            let titleanchor = 'middle'

            if(titlealign === 0){
                titlex = 0;
                titleanchor = 'start';
            } else if(titlealign===1){
                titlex = options.viewport.width/2;
                titleanchor = 'middle';

            } else if(titlealign===2){
                titlex = options.viewport.width;
                titleanchor = 'end';
            }

            this.svg.selectAll('.titlevalue').remove();
            this.svg.append('g').append('text')
                .style('font-size', '5vw')
                .attr("x", titlex)
                .attr("y", 20)
                .attr('text-anchor', titleanchor)
                .style('fill', 'blue')
                .attr('class', 'titlevalue')
                .text(titletext);
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