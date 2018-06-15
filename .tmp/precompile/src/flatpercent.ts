module powerbi.extensibility.visual.flatpercent4542516F697944D4BA75699C96A7D2E5  {
    "use strict";

    export class FlatPercent {
        constructor(private gcontainer: d3.Selection<SVGElement>, private margin: Margin = null) {
            if (!this.margin) {
                this.margin = new Margin();
            }
        }

        private previousvalue: number = null;

        public Update(options: VisualUpdateOptions, value: number) {
            const init = this.initContainer(options);
            
            if (init.params.multiplier) {
                value *= 100;
            }

            value = Math.ceil(value);

            const radius = Math.min(init.gWidth, init.gHeight) / 2;
            const arc = d3.svg.arc()
                .outerRadius(radius)
                .innerRadius(radius * (100-init.params.arcsize)/100);

            const pie = d3.layout.pie();

            this.gcontainer.selectAll('.arcvalue').remove();

            const basearc = this.gcontainer.append('g')
                .attr('class', 'arcvalue')
                .attr('transform', `translate(${init.gWidth / 2},${init.gHeight / 2})`);

            const dpath = basearc.selectAll('path')
                .data(pie([value, 100 - value]));

            const path = dpath
                .enter().append('path')
                .attr('fill', (d, i) => i ? init.params.emptyColor : init.params.defaultColor);

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

            this.gcontainer.selectAll('.textvalue').remove();

            this.gcontainer.append('text')
                .style('font-size', `${init.params.fontSize}vh`)
                .attr("x", init.gWidth / 2)
                .attr("y", init.gHeight / 2)
                .attr('text-anchor', 'middle')
                .attr('alignment-baseline', 'middle')
                .style('fill', init.params.defaultColor)
                .attr('class', 'textvalue')
                .text(`${value}%`);
        }

        private initContainer(options: VisualUpdateOptions): any {
            const settings = parseSettings(options && options.dataViews && options.dataViews[0]);

            const params: flatPercentSettings = {
                defaultColor: settings.flatpercent.defaultColor,
                emptyColor: settings.flatpercent.emptyColor,
                fontSize: settings.flatpercent.fontSize,
                multiplier: settings.flatpercent.multiplier,
                arcsize: settings.flatpercent.arcsize
            };

            const gHeight = options.viewport.height - this.margin.top - this.margin.bottom;
            const gWidth = options.viewport.width - this.margin.right - this.margin.left;

            this.gcontainer.attr({
                height: gHeight,
                width: gWidth
            });

            this.gcontainer.attr('transform',
                'translate(' + this.margin.left + ',' + this.margin.top + ')');

            return { params, gHeight, gWidth };
        }
    }
}