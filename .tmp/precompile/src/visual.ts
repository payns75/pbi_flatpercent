module powerbi.extensibility.visual.flatpercent4542516F697944D4BA75699C96A7D2E5  {
    "use strict";
    export class Visual implements IVisual {
        private svg: d3.Selection<SVGElement>;
        private gcontainer: d3.Selection<SVGElement>;
        private settings: VisualSettings;

        private margin = { top: 20, right: 20, bottom: 20, left: 20 };

        constructor(options: VisualConstructorOptions) {
            this.svg = d3.select(options.element).append('svg');
            this.gcontainer = this.svg.append('g').classed('percenter', true);
        }

        private previousvalue: number = null;

        public update(options: VisualUpdateOptions) {
            this.settings = Visual.parseSettings(options && options.dataViews && options.dataViews[0]);
            var _this = this;

            var params: flatPercentSettings = {
                defaultColor: _this.settings.flatpercent.defaultColor,
                emptyColor: _this.settings.flatpercent.emptyColor,
                fontSize: _this.settings.flatpercent.fontSize,
                multiplier: _this.settings.flatpercent.multiplier
            };

            let value = +options.dataViews[0].categorical.values[0].values[0];

            if (params.multiplier) {
                value *= 100;
            }

            value = Math.ceil(value);

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

            _this.gcontainer.attr({
                height: gHeight,
                width: gWidth
            });
            _this.gcontainer.attr('transform',
                'translate(' + _this.margin.left + ',' + _this.margin.top + ')');

            const radius = Math.min(gWidth, gHeight) / 2;
            const arc = d3.svg.arc()
                .outerRadius(radius)
                .innerRadius(radius * 0.96);

            const pie = d3.layout.pie();

            _this.gcontainer.selectAll('.arcvalue').remove();

            const basearc = this.gcontainer.append('g')
                .attr('class', 'arcvalue')
                .attr('transform', `translate(${gWidth / 2},${gHeight / 2})`);

            const dpath = basearc.selectAll('path')
                .data(pie([value, 100 - value]));

            const path = dpath
                .enter().append('path')
                .attr('fill', (d, i) => i ? params.emptyColor : params.defaultColor);

            if (value !== this.previousvalue) {
                path.transition().delay((d, i) => i * 500).duration(500)
                    .attrTween('d', (d) => {
                        const i = d3.interpolate(d.startAngle + 0.1, d.endAngle);
                        return (t) => {
                            d.endAngle = i(t);
                            return arc(<any>d);
                        };
                    });
                this.previousvalue = value;
            } else {
                path.attr("d", <any>arc);
            }

            dpath.exit()
                .remove();

            _this.gcontainer.selectAll('.textvalue').remove();

            _this.gcontainer.append('text')
                .style('font-size', `${params.fontSize}vh`)
                .attr("x", gWidth / 2)
                .attr("y", gHeight / 2)
                .attr('text-anchor', 'middle')
                .attr('alignment-baseline', 'middle')
                .style('fill', params.defaultColor)
                .attr('class', 'textvalue')
                .text(`${value}%`);
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