import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FileuploaddemoComponent } from './fileuploaddemo/fileuploaddemo.component';
import { FormsModule} from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { NgxCaptureModule } from 'ngx-capture';

@NgModule({
  declarations: [
    AppComponent,
    FileuploaddemoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxCaptureModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
