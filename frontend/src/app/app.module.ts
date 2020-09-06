import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { AppRoutingModule } from './app.routes';
import { CountryComponent } from './components/country/country.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from './auth.guard';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { GaleryComponent } from './components/galery/galery.component';
import { PhotoFormComponent } from './components/photo-form/photo-form.component';
import { PhotoPreviewComponent } from './components/photo-preview/photo-preview.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import { UploadComponent } from './components/upload/upload.component';
import { PhotoForm2Component } from './components/photo-form2/photo-form2.component';
import { ListComponent } from './components/list/list.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { JumbotronComponent } from './components/jumbotron/jumbotron.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { ThreecolumnComponent } from './components/threecolumn/threecolumn.component';
import { TwocolumnComponent } from './components/twocolumn/twocolumn.component';
import { FixedbackrComponent } from './components/fixedbackr/fixedbackr.component';
import { EmojiComponent } from './components/emoji/emoji.component';
import { TeamComponent } from './components/team/team.component';
import { CardsComponent } from './components/cards/cards.component';
import { ConnectComponent } from './components/connect/connect.component';
import { FooterComponent } from './components/footer/footer.component';
import { PhotoForm3Component } from './components/photo-form3/photo-form3.component';
import { TableComponent } from './components/table/table.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SigninComponent,
    SignupComponent,
    HomeComponent,
    CountryComponent,
    GaleryComponent,
    PhotoFormComponent,
    PhotoPreviewComponent,
    UploadComponent,
    PhotoForm2Component,
    ListComponent,
    CarouselComponent,
    JumbotronComponent,
    WelcomeComponent,
    ThreecolumnComponent,
    TwocolumnComponent,
    FixedbackrComponent,
    EmojiComponent,
    TeamComponent,
    CardsComponent,
    ConnectComponent,
    FooterComponent,
    PhotoForm3Component,
    TableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxFileDropModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
