import {Injectable} from '@angular/core';
import {appInjector} from './app_injector';
import {Auth} from './auth';
import {Router, ComponentInstruction} from '@angular/router-deprecated';

export const checkAuth = (next: ComponentInstruction, previous: ComponentInstruction, router: Router) => {
    let auth: Auth = new Auth();

    // return a boolean or a promise that resolves a boolean
    return new Promise((resolve, reject) => {

        if (auth.check()) {
            // already login, redirect to default page
            if (next.urlPath == 'login' || next.urlPath == 'signup') {
                if (router) {
                    router.navigate(['AlbumList']);	// r
                } else {
                    window.location.href = 'abumlist';
                }
                resolve(false);
            }
            // show the page
            else {
                resolve(true);
            }
        } else {
            // not login; show the login page
            if (next.urlPath == 'login' || next.urlPath == 'signup') {
                resolve(true);
            }
            // restrict the page
            else {
                if (router) {
                    router.navigate(['Login']); // r
                } else {
                    window.location.href = 'login';
                }
                //window.location.href = 'login';
                resolve(false);
            }
        }
    });
};
