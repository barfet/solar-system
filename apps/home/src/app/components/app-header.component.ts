import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-header',
    template: `
        <div id="sun-image">
            <img src="https://s3.amazonaws.com/planets-images/sun.jpg" alt="Sun image" />
        <div>
    `,
    styles: [`
        #sun-image { 
            width: 100%;
        }
    `]
})

export class AppHeaderComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}