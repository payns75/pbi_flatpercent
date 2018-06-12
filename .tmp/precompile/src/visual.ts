/*
 *  Power BI Visual CLI
 *
 *  Copyright (c) Microsoft Corporation
 *  All rights reserved.
 *  MIT License
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the ""Software""), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in
 *  all copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *  THE SOFTWARE.
 */

module powerbi.extensibility.visual.flatpercent4542516F697944D4BA75699C96A7D2E5  {
    "use strict";
    export class Visual implements IVisual {
        private svg: d3.Selection<SVGElement>;
        private g: d3.Selection<SVGElement>;
        private margin = { top: 20, right: 70, bottom: 20, left: 10 };

        private percentcontainer: d3.Selection<SVGElement>;
        private host: IVisualHost;
        private selectionManager: ISelectionManager;
        private target: HTMLElement;
        private updateCount: number;
        private settings: VisualSettings;
        private textNode: Text;

        static Config = {
            xScalePadding: 0.1,
            solidOpacity: 1,
            transparentOpacity: 0.5,
            xAxisFontMultiplier: 0.04,
        };


        constructor(options: VisualConstructorOptions) {
            console.log('Visual constructor', options);
            this.svg = d3.select(options.element).append('svg');
            this.g = this.svg.append('g').classed('percenter', true);
        }

        public update(options: VisualUpdateOptions) {
            console.log('Visual update', options);

            let value = +options.dataViews[0].categorical.values[0].values[0] * 100;
            value = Math.ceil(value);
            //let value = 45;


           
            //.value(function (d) { return 32; });

            // "this" scope will change in the nested function
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


 //const radius = 40;

            const radius = Math.min(gWidth, gHeight) / 2;
            //const radius = 100;

            const arc = d3.svg.arc()
                .outerRadius(radius * 0.9)
                .innerRadius(radius * 0.85)
            // .startAngle(45 * (Math.PI / 180)) //converting from degs to radians
            // .endAngle(3) //just radians

            const pie = d3.layout.pie().sort(null)

            _this.g
                .append("rect")
                .attr("width", gWidth)
                .attr("height", gHeight)
                .attr("fill", "pink");

            _this.g.selectAll('.textvalue').remove();

            _this.g.append('text')
                .style('font-size', '40px')
                .attr("x", gWidth / 2)
                .attr("y", gHeight / 2)
                .attr('text-anchor', 'middle')
                .attr('alignment-baseline', 'middle')
                .style('fill', "green")
                .attr('class', 'textvalue')
                //.attr('transform', 'translate(2,32)')
                //.attr('transform', `translate(${gWidth / 2},${gHeight / 2})`)
                .text(`${value}%`);

            // 230/2=115

            _this.g.selectAll('.arcvalue').remove();

            const basearc = this.g.append('g')
                .attr('class', 'arcvalue')
                .attr('width', 230)
                .attr('height', 130)
                .append('g')
                .attr('transform', `translate(${gWidth / 2},${gHeight / 2})`);

            const dpath = basearc.selectAll('path')
                .data(pie([value, 100 - value]));

            const path = dpath
                .enter().append('path')
                .attr('fill', (d, i) => i ? 'transparent' : 'red')
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

        private static parseSettings(dataView: DataView): VisualSettings {
            return VisualSettings.parse(dataView) as VisualSettings;
        }

        /** 
         * This function gets called for each of the objects defined in the capabilities files and allows you to select which of the 
         * objects and properties you want to expose to the users in the property pane.
         * 
         */
        public enumerateObjectInstances(options: EnumerateVisualObjectInstancesOptions): VisualObjectInstance[] | VisualObjectInstanceEnumerationObject {
            return VisualSettings.enumerateObjectInstances(this.settings || VisualSettings.getDefault(), options);
        }
    }
}