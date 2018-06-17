module powerbi.extensibility.visual {
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

            if (settings.insideValue.multiplier) {
                value *= 100;
            }

            value = Math.ceil(value);

            let isvalidvalue = value && !isNaN(Number(value.toString())) && value !== Infinity;

            if (isvalidvalue && value > 0 && settings.pie.show) {
                const radius = Math.min(init.gWidth, init.gHeight) / 2;
                const arc = d3.svg.arc()
                    .outerRadius(radius)
                    .innerRadius(radius * (100 - settings.pie.arcSize) / 100);

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

                const pieColor = settings.vor.onPie ? this.getVorColor(settings, value) : settings.pie.defaultColor;

                const path = dpath
                    .enter().append('path')
                    .attr('fill', (d, i) => i ? settings.pie.emptyColor : pieColor);

                if (value !== this.previousvalue && settings.animation.show) {
                    path.transition().delay((d, i) => i * settings.animation.duration).duration(settings.animation.duration)
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

            if (settings.insideValue.show) {
                let textcolor = settings.insideValue.defaultColor;

                if (isvalidvalue && settings.vor.onValue) {
                    textcolor = this.getVorColor(settings, value);
                }

                let textValue = isvalidvalue ? `${value}${settings.insideValue.suffix}` : settings.insideValue.nanText;

                this.gcontainer.append('g').append('text')
                    .style('font-size', `${settings.insideValue.fontSize}vw`)
                    .attr("x", init.gWidth / 2)
                    .attr("y", init.gHeight / 2)
                    .attr('text-anchor', 'middle')
                    .attr('alignment-baseline', 'middle')
                    .style('fill', textcolor)
                    .attr('class', 'textvalue')
                    .text(textValue);
            }
        }

        private getVorColor(settings: VisualSettings, value: number): string {
            if (settings.vor.show) {
                if (settings.vor.fixedValues) {
                    if (value < settings.vor.firstValue) {
                        return settings.vor.lowColor;
                    } else if (value > settings.vor.firstValue && value < settings.vor.secondValue) {
                        return settings.vor.middleColor;
                    } else {
                        return settings.vor.highColor;
                    }
                } else {
                    // TODO : Measures values.
                }
            }

            return settings.insideValue.defaultColor;
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