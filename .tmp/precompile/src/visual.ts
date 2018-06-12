module powerbi.extensibility.visual.flatpercent4542516F697944D4BA75699C96A7D2E5  {
    "use strict";
    export class Visual implements IVisual {
        private svg: d3.Selection<SVGElement>;
        private g: d3.Selection<SVGElement>;
        private margin = { top: 10, right: 10, bottom: 10, left: 10 };

        // private percentcontainer: d3.Selection<SVGElement>;
        // private host: IVisualHost;
        // private selectionManager: ISelectionManager;
        // private target: HTMLElement;
        // private updateCount: number;
        // private settings: VisualSettings;
        // private textNode: Text;

        // static Config = {
        //     xScalePadding: 0.1,
        //     solidOpacity: 1,
        //     transparentOpacity: 0.5,
        //     xAxisFontMultiplier: 0.04,
        // };


        constructor(options: VisualConstructorOptions) {
            console.log('Visual constructor', options);
            this.svg = d3.select(options.element).append('svg');
            this.g = this.svg.append('g').classed('percenter', true);
        }

        public update(options: VisualUpdateOptions) {
            console.log('Visual update', options);

            let value = +options.dataViews[0].categorical.values[0].values[0] * 100;
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

            // _this.g
            //     .append("rect")
            //     .attr("width", gWidth)
            //     .attr("height", gHeight)
            //     .attr("fill", "pink");

            _this.g.selectAll('.textvalue').remove();

            _this.g.append('text')
                .style('font-size', '40px')
                .attr("x", gWidth / 2)
                .attr("y", gHeight / 2)
                .attr('text-anchor', 'middle')
                .attr('alignment-baseline', 'middle')
                .style('fill', "#E91E63")
                .attr('class', 'textvalue')
                .text(`${value}%`);

            _this.g.selectAll('.arcvalue').remove();

            const basearc = this.g.append('g')
                .attr('class', 'arcvalue')
                // .attr('width', 230)
                // .attr('height', 130)
                //.append('g')
                .attr('transform', `translate(${gWidth / 2},${gHeight / 2})`);

            const dpath = basearc.selectAll('path')
                .data(pie([value, 100 - value]));

            const path = dpath
                .enter().append('path')
                .attr('fill', (d, i) => i ? 'transparent' : '#E91E63')
                .transition().delay((d, i) => i * 500).duration(500)
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

        // private static parseSettings(dataView: DataView): VisualSettings {
        //     return VisualSettings.parse(dataView) as VisualSettings;
        // }

        /** 
         * This function gets called for each of the objects defined in the capabilities files and allows you to select which of the 
         * objects and properties you want to expose to the users in the property pane.
         * 
         */
        // public enumerateObjectInstances(options: EnumerateVisualObjectInstancesOptions): VisualObjectInstance[] | VisualObjectInstanceEnumerationObject {
        //     return VisualSettings.enumerateObjectInstances(this.settings || VisualSettings.getDefault(), options);
        // }
    }
}