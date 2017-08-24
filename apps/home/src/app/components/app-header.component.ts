import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-header',
    template: `
        <div class="container-fluid header">
            <div class="row">
                <div class="col-md-12">
                    <img src="../../assets/img/Sun.jpg" />
                </div>
            </div>
        </div>
    `,
    styles: [`

    `]
})

export class AppHeaderComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}