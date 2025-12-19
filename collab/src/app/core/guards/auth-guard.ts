import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
    if (localStorage.getItem('isLoggedIn') !== 'true') {
        alert('You must be logged in');
        return false;
    }
    return true;
};