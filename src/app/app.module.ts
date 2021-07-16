import { CustomSerializer } from './store/CustomSerializer';

import { SearchComponent } from './components/search/search.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AddtocartComponent } from './components/addtocart/addtocart.component';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { LoginComponent } from './components/user/login.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ShoppingcartComponent } from './components/shoppingcart/shoppingcart.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HttpInterceptorService } from './interceptors/http-interceptor.service';
import { ErrorInterceptorService } from './interceptors/error-interceptor.service';
import { NgMaterialModule } from './ng-material/ng-material.module';
import { AppRoutingModule } from './app-routing.module';
import { AddtowishlistComponent } from './components/addtowishlist/addtowishlist.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { environment } from 'src/environments/environment';
import { SimilarbooksComponent } from './components/similarbooks/similarbooks.component';
import { UserRegistrationComponent } from './components/user-registration/user-registration.component';
import { ThemePickerComponent } from './components/theme-picker/theme-picker.component';
import { BookSubscriptionComponent } from './components/book-subscription/book-subscription.component';
import { AddtobooksubscriptionComponent } from './components/addtobooksubscription/addtobooksubscription.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { BookCardComponent } from './components/book-card/book-card.component';
import { BookFilterComponent } from './components/book-filter/book-filter.component';
import { HomeComponent } from './components/home/home.component';
import { PriceFilterComponent } from './components/price-filter/price-filter.component';
import { reducers, metaReducers } from './store/reducers';
import * as fromUser from '../app/store/reducers/user/user.reducer';
import { UserEffects } from './store/effects/user.effects';
import { StoreRouterConnectingModule, RouterStateSerializer } from '@ngrx/router-store';

@NgModule({
  declarations: [
    AppComponent,
    AddtocartComponent,
    HomeComponent,
    BookFilterComponent,
    BookCardComponent,
    PriceFilterComponent,
    BookDetailsComponent,
    CheckoutComponent,
    LoginComponent,
    MyOrdersComponent,
    UserRegistrationComponent,
    NavBarComponent,
    ShoppingcartComponent,
    ThemePickerComponent,
    SimilarbooksComponent,
    PageNotFoundComponent,
    SearchComponent,
    AddtowishlistComponent,
    WishlistComponent,
    BookSubscriptionComponent,
    AddtobooksubscriptionComponent
  ],
  imports: [
    NgMaterialModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    EffectsModule.forRoot([]),
    AppRoutingModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument({
      name: 'KhotsoCBookStore App DevTools',
    }) : [],
    StoreModule.forFeature(fromUser.userFeatureKey, fromUser.userReducer),
    EffectsModule.forFeature([UserEffects]),
    // StoreRouterConnectingModule.forRoot({ stateKey: 'router' })
    StoreRouterConnectingModule.forRoot({
     serializer: CustomSerializer,
    }),
  ],
  providers: [
    { provide: RouterStateSerializer, useClass: CustomSerializer },
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
