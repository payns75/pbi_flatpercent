module powerbi.extensibility.visual.flatpercent4542516F697944D4BA75699C96A7D2E6  {
    "use strict";

    export class FlatPercent {
        constructor(private gcontainer: d3.Selection<SVGElement>, public margin: Margin = null) {
            if (!this.margin) {
                this.margin = new Margin();
            }
        }

        private previousvalue: number = null;

        public Update(options: VisualUpdateOptions, settings: VisualSettings, value: number) {
            const init = this.initContainer(options, settings);
            this.gcontainer.selectAll('.arcvalue').remove();
            this.gcontainer.selectAll('.textvalue').remove();

            if (settings.flatpercent.multiplier) {
                value *= 100;
            }

            value = Math.ceil(value);

            if (value && value > 0) {
                const radius = Math.min(init.gWidth, init.gHeight) / 2;
                const arc = d3.svg.arc()
                    .outerRadius(radius)
                    .innerRadius(radius * (100 - settings.flatpercent.arcsize) / 100);

                const pie = d3.layout.pie().sort(null);

                const basearc = this.gcontainer.append('g')
                    .attr('class', 'arcvalue')
                    .attr('transform', `translate(${init.gWidth / 2},${init.gHeight / 2})`);

                let values = [value > 100 ? 100 : value];

                if (value < 100) {
                    values.push(100 - value);
                }

                const dpath = basearc.selectAll('path')
                    .data(pie(values));

                const path = dpath
                    .enter().append('path')
                    .attr('fill', (d, i) => i ? settings.flatpercent.emptyColor : settings.flatpercent.defaultColor);

                if (value !== this.previousvalue) {
                    path.transition().delay((d, i) => i * 500).duration(500)
                        .attrTween('d', (d) => {
                            const i = d3.interpolate(d.startAngle + 0.1, d.endAngle);
                            return (t) => {
                                d.endAngle = i(t);
                                return arc(<any>d);
                            };
                        });

                } else {
                    path.attr("d", <any>arc);
                }

                dpath.exit()
                    .remove();
            }

            this.previousvalue = value;

            this.gcontainer.append('g').append('text')
                .style('font-size', `${settings.flatpercent.fontSize}vw`)
                .attr("x", init.gWidth / 2)
                .attr("y", init.gHeight / 2)
                .attr('text-anchor', 'middle')
                .attr('alignment-baseline', 'middle')
                .style('fill', settings.flatpercent.textcolor)
                .attr('class', 'textvalue')
                .text(`${value}%`);
        }

        private initContainer(options: VisualUpdateOptions, settings: VisualSettings): any {
            const gHeight = options.viewport.height - this.margin.top - this.margin.bottom;
            const gWidth = options.viewport.width - this.margin.right - this.margin.left;

            this.gcontainer.attr({
                height: gHeight,
                width: gWidth
            });

            this.gcontainer.attr('transform',
                'translate(' + this.margin.left + ',' + this.margin.top + ')');

            return { gHeight, gWidth };
        }
    }
}