import { Component, OnInit } from '@angular/core';

import '../styles/app.scss';

@Component({
    selector: 'app',
    template: `
        <app-header></app-header>
        <main class="c-wrapper">
            <div class="app-body">
                <planets-list></planets-list>
            </div>
        </main>
    `
})
export class AppComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }
}
