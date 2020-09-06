import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { CountryComponent } from './components/country/country.component';
import { AuthGuard } from './auth.guard';
import { GaleryComponent } from './components/galery/galery.component';
import { PhotoFormComponent } from './components/photo-form/photo-form.component';
import { PhotoPreviewComponent } from './components/photo-preview/photo-preview.component';
import { PhotoForm2Component } from './components/photo-form2/photo-form2.component';

const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'signin', component: SigninComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'country', component: CountryComponent, canActivate: [AuthGuard] },
    { path: 'galery', component: GaleryComponent, canActivate: [AuthGuard] },
    { path: 'photo-form', component: PhotoFormComponent, canActivate: [AuthGuard] },
    { path: 'photo-form2', component: PhotoForm2Component, canActivate: [AuthGuard] },
    { path: 'photo-preview/:id', component: PhotoPreviewComponent, canActivate: [AuthGuard] }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
