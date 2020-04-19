import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageMap } from '@ngx-pwa/local-storage';
import chatbots from '../../resources/data.json';

@Component({
  selector: 'app-chatbots-listing',
  templateUrl: './chatbots-listing.component.html',
  styleUrls: ['./chatbots-listing.component.scss']
})
export class ChatbotsListingComponent implements OnInit {

  chatbots = chatbots;
  chatbotsAllItens = Object.assign([], this.chatbots);

  chatbotsFavorities = [];
  chatbotsFavoritiesAllItens = Object.assign([], this.chatbotsFavorities);

  chatbotSearch = '';

  ORGANIZE_BOCKS = 'BOCKS';
  ORGANIZE_LIST = 'LIST';

  selectedOrganization = '';

  constructor(private router: Router, private storage: StorageMap) { 
    this.storage.get('selectedOrganization').subscribe((selectedOrganization) => {
      this.selectedOrganization = (selectedOrganization ? selectedOrganization.toString() : this.ORGANIZE_BOCKS);
    });
    for (let chatbot of this.chatbots) {
      this.storage.get(chatbot.shortName).subscribe((shortName) => {
        if (shortName) {
          this.addChatbotOnFavorities(chatbot);
        }
      });
    }
  }

  ngOnInit(): void {
  }

  updateListsAllItens() {
    this.chatbotsAllItens = Object.assign([], this.chatbots);
    this.chatbotsFavoritiesAllItens = Object.assign([], this.chatbotsFavorities);
  }

  addChatbotOnFavorities(chatbot) {
    this.chatbots = this.chatbots.filter(function(c) {
      return c.name !== chatbot.name && c.shortName && chatbot.name;
    });
    this.chatbotsFavorities.push(chatbot);
    this.storage.set(chatbot.shortName, chatbot.shortName).subscribe(() => {});
    this.updateListsAllItens();
  }

  removeChatbotOnFavorities(chatbot) {
    this.chatbotsFavorities = this.chatbotsFavorities.filter(function(c) {
      return c.name !== chatbot.name && c.shortName && chatbot.name;
    });
    this.chatbots.push(chatbot);
    this.storage.delete(chatbot.shortName).subscribe(() => {});
    this.updateListsAllItens();
  }

  filterChatbotsByName(chatbotSearch) {
    if (chatbotSearch) {
      this.chatbots = this.chatbotsAllItens.filter(function(c) {
        return c.name.toLowerCase().includes(chatbotSearch.toLowerCase());
      });
      this.chatbotsFavorities = this.chatbotsFavoritiesAllItens.filter(function(c) {
        return c.name.toLowerCase().includes(chatbotSearch.toLowerCase());
      });
    } else {
      this.chatbots = Object.assign([], this.chatbotsAllItens);
      this.chatbotsFavorities = Object.assign([], this.chatbotsFavoritiesAllItens);
    }
  }

  sortListByName(chatbotsList) {
    chatbotsList = chatbotsList.sort((c1, c2) => {
      if (c1.name > c2.name) {
          return 1;
      }
      if (c1.name < c2.name) {
          return -1;
      }
      return 0;
    });
  }

  orderChatbotsByName() {
    this.sortListByName(this.chatbots);
    this.sortListByName(this.chatbotsFavorities);
  }

  sortListByCreation(chatbotsList) {
    chatbotsList = chatbotsList.sort((c1, c2) => {
      if (new Date(c1.created) > new Date(c2.created)) {
          return 1;
      }
      if (new Date(c1.created) < new Date(c2.created)) {
          return -1;
      }
      return 0;
    });
  }

  orderChatbotsByCreation() {
    this.sortListByCreation(this.chatbots);
    this.sortListByCreation(this.chatbotsFavorities);
  }

  selectBlocksOrganization() {
    this.selectedOrganization = this.ORGANIZE_BOCKS;
    this.storage.set('selectedOrganization', this.ORGANIZE_BOCKS).subscribe(() => {});
  }

  selectListOrganization() {
    this.selectedOrganization = this.ORGANIZE_LIST;
    this.storage.set('selectedOrganization', this.ORGANIZE_LIST).subscribe(() => {});
  }

  goToDetails(chatbot) {
    this.router.navigate(['/details', chatbot.shortName], { 
      state: { chatbot: chatbot }
    });
  }

}