import { Injectable } from '@angular/core';

import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
    currentUser: User | null | undefined;
    redirectUrl: string | undefined;

    constructor() {  }

    isLoggedIn(): boolean {
        return !!this.currentUser;
    }

    login(userName: string, passWord: string): void {
        // Code here would log into a back end service
        // and return user information
        // This is just hard-coded here.
        this.currentUser = {
            id: 2,
            userName,
            passWord,
            hasSubsription: false,
            emailaddress: 'Mokhetkc@hotmail.com',
            firstName: 'Khotso',
            lastName: 'Mokhethi'
        };
    }

    logout(): void {
        this.currentUser = null;
    }
}
