import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';

@NgModule({
    imports: [
        StoreModule.forRoot({}),
        StoreDevtoolsModule.instrument({
            name: 'KhotsoCBookStore App DevTools',
            maxAge: 25,
            logOnly: environment.production,
        }),
        EffectsModule.forRoot([])

    ],
    exports: [StoreModule]
})
export class StorageModule { }