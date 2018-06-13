module powerbi.extensibility.visual {
    "use strict";
    export class Visual implements IVisual {
        private svg: d3.Selection<SVGElement>;
        private g: d3.Selection<SVGElement>;
        private settings: VisualSettings;
        private margin = { top: 10, right: 10, bottom: 10, left: 10 };

        constructor(options: VisualConstructorOptions) {
            console.log('Visual constructor', options);
            this.svg = d3.select(options.element).append('svg');
            this.g = this.svg.append('g').classed('percenter', true);
        }

        public update(options: VisualUpdateOptions) {
            this.settings = Visual.parseSettings(options && options.dataViews && options.dataViews[0]);
            var color = this.settings.flatpercent.defaultColor;
            var emptycolor = this.settings.flatpercent.emptyColor;
            var fontsize = this.settings.flatpercent.fontSize;
            var muliplier = this.settings.flatpercent.multiplier;

            let value = +options.dataViews[0].categorical.values[0].values[0];

            if(muliplier){
                value *= 100;
            }

            value = Math.ceil(value);

            var _this = this;

            // get height and width from viewport
            _this.svg.attr({
                height: options.viewport.height,
                width: options.viewport.width
            });
            var gHeight = options.viewport.height
                - _this.margin.top
                - _this.margin.bottom;
            var gWidth = options.viewport.width
                - _this.margin.right
                - _this.margin.left;
            _this.g.attr({
                height: gHeight,
                width: gWidth
            });
            _this.g.attr('transform',
                'translate(' + _this.margin.left + ',' + _this.margin.top + ')');

            const radius = Math.min(gWidth, gHeight) / 2;
            const arc = d3.svg.arc()
                .outerRadius(radius * 0.9)
                .innerRadius(radius * 0.85);

            const pie = d3.layout.pie().sort(null)
            
            _this.g.selectAll('.textvalue').remove();

            _this.g.append('text')
                .style('font-size', `${fontsize}px`)
                .attr("x", gWidth / 2)
                .attr("y", gHeight / 2)
                .attr('text-anchor', 'middle')
                .attr('alignment-baseline', 'middle')
                .style('fill', color)
                .attr('class', 'textvalue')
                .text(`${value}%`);

            _this.g.selectAll('.arcvalue').remove();

            const basearc = this.g.append('g')
                .attr('class', 'arcvalue')
                .attr('transform', `translate(${gWidth / 2},${gHeight / 2})`);

            const dpath = basearc.selectAll('path')
                .data(pie([value, 100 - value]));

            const path = dpath
                .enter().append('path')
                .attr('fill', (d, i) => i ? emptycolor : color)
                .transition().delay((d, i) => i * 100).duration(500)
                .attrTween('d', (d) => {
                    const i = d3.interpolate(d.startAngle + 0.1, d.endAngle);
                    return (t) => {
                        d.endAngle = i(t);
                        return arc(<any>d);
                    };
                });

            dpath.exit()
                .remove();
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