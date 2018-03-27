import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, ChartDataSets, ChartOptions, LinearTickOptions, ChartTooltipItem } from 'chart.js';
import { ColorService } from '@ux-aspects/ux-aspects';
import 'chart.js';
import { ChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.less']
})
export class ChartComponent {
  datasets: ChartDataSets[] = [
    {
        data: [
            0, 0.7, 6.6, 8.7, 7.4, 5.3, 3.5, 2.4, 
            2.2, 2.5, 3.5, 5, 7.7, 10.1, 10.5, 7.8, 
            5.3, 4.2, 3.9, 4, 4.5, 5.4, 4.7, 1.1, 0
        ]
    }
];

labels: string[] = new Array<string>(25);

colors = [
    {
        backgroundColor: this._colorService.getColor('cerulean').toHex(),
        borderColor: 'transparent',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#000',
        pointHoverBorderWidth: 3,
        pointHoverRadius: 4.5,
        pointHitRadius: 15,
        pointRadius: 0,
    }];

options: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    tooltips: {
        enabled: true
    },
    hover: {
        mode: 'nearest'
    },
    scales: {
        xAxes: [{               
            gridLines: {
                drawOnChartArea: false,
                color: 'transparent',
                zeroLineColor: 'transparent'
            },
            ticks: {
                minRotation: 0,
                maxRotation: 0,
                fontColor: this._colorService.getColor('dark-gray').toHex(),
                fontFamily: 'Metric',
                fontSize: 15

            }
        }],
        yAxes: [{
            stacked: true, 
            gridLines: {
                drawOnChartArea: false,
                color: this._colorService.getColor('silver').toHex(),
                drawTicks: false
            },
            ticks: {
                min: 0,
                max: 20,
                stepSize: 5,
                fontColor: this._colorService.getColor('dark-gray').toHex(),
                fontFamily: 'Metric',
                fontSize: 15,
                padding: 15
            } as LinearTickOptions
        }]
    }
};

constructor(private _colorService: ColorService) {
    this.labels[0] = '2am';
    this.labels[12] = '11am';
    this.labels[24] = '1pm';
}

 }
