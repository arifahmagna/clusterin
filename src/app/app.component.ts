import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { PushNotifications, Token, PushNotificationSchema, ActionPerformed } from '@capacitor/push-notifications';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  constructor(private platform: Platform) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.registerPush();
    });
  }

  registerPush() {
    PushNotifications.requestPermissions().then(result => {
      if (result.receive === 'granted') {
        PushNotifications.register();
      } else {
        console.log('Push Notification permission not granted');
      }
    });

    // Get token
    PushNotifications.addListener('registration', (token: Token) => {
      console.log('Push registration success, token: ' + token.value);
    });

    // Handle error
    PushNotifications.addListener('registrationError', err => {
      console.error('Push registration error: ', err);
    });

    // Saat notifikasi diterima
    PushNotifications.addListener('pushNotificationReceived', (notification: PushNotificationSchema) => {
      console.log('Push received: ', notification);
      alert(`📢 ${notification.title}: ${notification.body}`);
    });

    // Saat notifikasi diklik
    PushNotifications.addListener('pushNotificationActionPerformed', (action: ActionPerformed) => {
      console.log('Push action performed: ', action);
    });
  }
}
