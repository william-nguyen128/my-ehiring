import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { TalentComponent } from './components/talent/talent.component';
import { TalentsTableComponent } from './talents-detail/talents-table/talents-table.component';
import { TalentsDetailComponent } from './talents-detail/talents-detail.component';

@NgModule({
  declarations: [AppComponent, TalentComponent, TalentsTableComponent, TalentsDetailComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
