import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatbotsListingComponent } from './chatbots-listing/chatbots-listing.component';
import { ChatbotDetailsComponent } from './chatbot-details/chatbot-details.component';


const routes: Routes = [
  {
    path: '',
    component: ChatbotsListingComponent
  },
  {
    path: 'details/:short_name',
    component: ChatbotDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
