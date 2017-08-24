import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-header',
    template: `
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12">
                    <img src="https://s3.amazonaws.com/planets-images/sun.jpg" alt="Sun image" />
                </div>
            </div>
        </div>
    `,
    styles: [`
        img {
            width: 100%;
        }
    `]
})

export class AppHeaderComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}