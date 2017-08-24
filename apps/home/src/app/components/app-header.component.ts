import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-header',
    template: `
        <div class="container-fluid header">
            <div class="row">
                <div class="col-md-12">
                    <img src="https://s3.amazonaws.com/planets-images/sun.jpg" />
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