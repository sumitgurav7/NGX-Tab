import { Component, Input, OnInit, NgZone } from '@angular/core';
import { IconTabBarComponent, IconTabBarFreeContentDirective, IconTabBarTabComponent, TabConfig } from '@fundamental-ngx/platform/icon-tab-bar';
import { cloneDeep } from 'lodash-es';
import { longTextTypeConfig, textTypeConfig } from '../config-for-examples/long-icon-type-config';
import { Observable, Observer, Subject } from 'rxjs';
import { FdkAsyncProperty } from '@fundamental-ngx/cdk/utils';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormModule } from '@fundamental-ngx/core/form';

@Component({
    selector: 'fd-icon-tab-bar-text-type-example',
    templateUrl: './icon-tab-bar-text-type-example.component.html',
    standalone: true,
    imports: [IconTabBarComponent,
        IconTabBarTabComponent,
        IconTabBarFreeContentDirective, CommonModule,
        FormsModule,
        FormModule,]
})
export class PlatformIconTabBarTextTypeExampleComponent implements OnInit {
    @Input()
    textTypeLayoutMode: 'row' | 'column' = 'row';

    @Input()
    enableTabReordering = false;

    @Input()
    withOverflowExample = false;

    @Input()
    nested = false;

    items: TabConfig[];

    count:number= 0;
    counterObserver!: Observer<number>;
    counterObservable: FdkAsyncProperty<number>;
    constructor(private _ngZone: NgZone) {}

    ngOnInit(): void {

        this.items = this.withOverflowExample ? cloneDeep(longTextTypeConfig) : cloneDeep(textTypeConfig);
        this.counterObservable = new Observable<number>((sub) => {this.counterObserver = sub;}) as FdkAsyncProperty<number>
        this.items[1].counter = this.counterObservable
        if (this.nested) {
            this.items[3].subItems = [
                {
                    label: 'Item 0',
                    counter: null,
                    color: 'critical',
                    subItems: [
                        {
                            label: 'Item 0.1',
                            counter: null,
                            color: null
                        },
                        {
                            label: 'Item 0.2',
                            counter: null,
                            color: null
                        }
                    ]
                },
                {
                    label: 'Item 1',
                    counter: null,
                    color: null
                },
                {
                    label: 'Item 2',
                    counter: null,
                    color: null
                }
            ];
        }
    }

    clickedMe(){
        this.count = this.count+1;
        this.counterObserver.next(this.count);
        console.log("counter clicked", this.items[1].counter.toLocaleString(), this.items[1]);
    }
}