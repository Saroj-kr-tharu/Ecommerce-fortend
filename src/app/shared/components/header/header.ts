import { Component, ElementRef, HostListener, signal, ViewChild } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IsMobileView } from '../../directives/is-mobile-view';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, IsMobileView],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
   @ViewChild('mobileMenu') mobileMenu!: ElementRef;
   isMobileMenuOpen = signal(false);
   isLogin = signal(false);
   isAdmin = signal(false);


     @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (this.isMobileMenuOpen()) {
      const menuEl = this.mobileMenu?.nativeElement;
      if (menuEl && !menuEl.contains(event.target)) {
        this.toggleMobileMenu();
      }
    }
  }
   
getVisibleLinks() {
  if (this.isAdmin()) {
    return [
      {text: 'Admin Dashboard', to: '/dashboard'},
      {text: 'Logout', to: '/logout'}
    ];
  } else if (this.isLogin()) {
    return [
      {text: 'Logout', to: '/logout'}
    ];
  } else {
    return [
      {text: 'Login', to: '/login'},
      {text: 'Register', to: '/signup'}
    ];
  }
}  
  
  
toggleMobileMenu() {
    this.isMobileMenuOpen.update(value => !value);
}

}


