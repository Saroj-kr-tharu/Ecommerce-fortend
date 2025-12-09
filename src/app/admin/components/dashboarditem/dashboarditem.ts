import { isPlatformBrowser } from '@angular/common';
import { Component, inject, PLATFORM_ID } from '@angular/core';
import { ChartModule } from 'primeng/chart';

import { Divider } from 'primeng/divider';
import { Cardbanner } from "../../../shared/components/cardbanner/cardbanner";

@Component({
  selector: 'app-dashboarditem',
  imports: [Cardbanner, Divider, ChartModule],
  templateUrl: './dashboarditem.html',
  styleUrl: './dashboarditem.css',
})
export class Dashboarditem {

  bannerItems = [
    {title: "Total Users", value:"2543", icon: "pi pi-users" },
    {title: "Total Products", value:"1234", icon: "pi pi-shopping-bag"},
    {title: "Total Orders", value:"856", icon: "pi pi-shopping-cart"},
    {title: "Revenue", value:"45678", icon: "pi pi-shopping-bag", pipe:'currency'},
    {title: "Confirmed Orders", value:"856", icon: "pi pi-shopping-cart"},
    {title: "Cancelled Orders", value:"856", icon: "pi pi-shopping-cart"},
    {title: "Pending Payment", value:"856", icon: "pi pi-shopping-cart"},
    {title: "Confirmed Payment", value:"856", icon: "pi pi-shopping-cart"},
  ]


    linedata: any;
    lineoptions: any;
    piedata: any;
    pieoptions: any;

    platformId = inject(PLATFORM_ID);

 

    ngOnInit() {
        this.lineChart();
        this.pieChart();
    }

    lineChart() {
        if (isPlatformBrowser(this.platformId)) {
            const documentStyle = getComputedStyle(document.documentElement);
            const textColor = documentStyle.getPropertyValue('--p-text-color');
            const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
            const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');

            this.linedata = {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [
                    {
                        label: 'First Dataset',
                        data: [65, 59, 80, 81, 56, 55, 40],
                        fill: false,
                        tension: 0.4,
                        borderColor: documentStyle.getPropertyValue('--p-cyan-500')
                    },
                    {
                        label: 'Second Dataset',
                        data: [28, 48, 40, 19, 86, 27, 90],
                        fill: false,
                        borderDash: [5, 5],
                        tension: 0.4,
                        borderColor: documentStyle.getPropertyValue('--p-orange-500')
                    },
                    {
                        label: 'Third Dataset',
                        data: [12, 51, 62, 33, 21, 62, 45],
                        fill: true,
                        borderColor: documentStyle.getPropertyValue('--p-gray-500'),
                        tension: 0.4,
                        backgroundColor: 'rgba(107, 114, 128, 0.2)'
                    }
                ]
            };

            this.lineoptions = {
                maintainAspectRatio: false,
                aspectRatio: 0.6,
                plugins: {
                    legend: {
                        labels: {
                            color: textColor
                        }
                    }
                },
                scales: {
                    x: {
                        ticks: {
                            color: textColorSecondary
                        },
                        grid: {
                            color: surfaceBorder
                        }
                    },
                    y: {
                        ticks: {
                            color: textColorSecondary
                        },
                        grid: {
                            color: surfaceBorder
                        }
                    }
                }
            };
           
        }
    }

     pieChart() {
        if (isPlatformBrowser(this.platformId)) {
            const documentStyle = getComputedStyle(document.documentElement);
            const textColor = documentStyle.getPropertyValue('--text-color');

            this.piedata = {
                labels: ['A', 'B', 'C'],
                datasets: [
                    {
                        data: [540, 325, 702],
                        backgroundColor: [documentStyle.getPropertyValue('--p-cyan-500'), documentStyle.getPropertyValue('--p-orange-500'), documentStyle.getPropertyValue('--p-gray-500')],
                        hoverBackgroundColor: [documentStyle.getPropertyValue('--p-cyan-400'), documentStyle.getPropertyValue('--p-orange-400'), documentStyle.getPropertyValue('--p-gray-400')]
                    }
                ]
            };

            this.pieoptions = {
                plugins: {
                    legend: {
                        labels: {
                            usePointStyle: true,
                            color: textColor
                        }
                    }
                }
            };
            // this.cd.markForCheck()
        }

      }



}
