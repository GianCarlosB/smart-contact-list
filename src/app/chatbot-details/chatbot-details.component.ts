import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chatbot-details',
  templateUrl: './chatbot-details.component.html',
  styleUrls: ['./chatbot-details.component.scss']
})
export class ChatbotDetailsComponent implements OnInit {

  STANDARD_PLAN = 'standard';

  chatbot = {
    shortName: '',
    name: '',
    description: '',
    image: '',
    template: '',
    created: '',
    updated: '',
    plan: '',
    culture: '', 
    analytics: {
      user: {
        total: 0,
        actived: 0
      },
      message: {
        received: 0,
        sent: 0
      }
    }
  };

  constructor(private router: Router) {
    if (this.router.getCurrentNavigation().extras.state) {
      this.chatbot = this.router.getCurrentNavigation().extras.state.chatbot;
    }
    else {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
  }

}
