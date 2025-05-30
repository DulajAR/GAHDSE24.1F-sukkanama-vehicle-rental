// File generated by FlutterFire CLI.
// ignore_for_file: type=lint
import 'package:firebase_core/firebase_core.dart' show FirebaseOptions;
import 'package:flutter/foundation.dart'
    show defaultTargetPlatform, kIsWeb, TargetPlatform;

/// Default [FirebaseOptions] for use with your Firebase apps.
///
/// Example:
/// ```dart
/// import 'firebase_options.dart';
/// // ...
/// await Firebase.initializeApp(
///   options: DefaultFirebaseOptions.currentPlatform,
/// );
/// ```
class DefaultFirebaseOptions {
  static FirebaseOptions get currentPlatform {
    if (kIsWeb) {
      return web;
    }
    switch (defaultTargetPlatform) {
      case TargetPlatform.android:
        return android;
      case TargetPlatform.iOS:
        return ios;
      case TargetPlatform.macOS:
        return macos;
      case TargetPlatform.windows:
        return windows;
      case TargetPlatform.linux:
        throw UnsupportedError(
          'DefaultFirebaseOptions have not been configured for linux - '
          'you can reconfigure this by running the FlutterFire CLI again.',
        );
      default:
        throw UnsupportedError(
          'DefaultFirebaseOptions are not supported for this platform.',
        );
    }
  }

  static const FirebaseOptions web = FirebaseOptions(
    apiKey: 'AIzaSyAzkIjGOrJWnCqm2u5yzIGjFCq7ZydfLE4',
    appId: '1:855380930373:web:7107e61ddf30721f09582c',
    messagingSenderId: '855380930373',
    projectId: 'sukkanama-vehicle-rent',
    authDomain: 'sukkanama-vehicle-rent.firebaseapp.com',
    storageBucket: 'sukkanama-vehicle-rent.firebasestorage.app',
  );

  static const FirebaseOptions android = FirebaseOptions(
    apiKey: 'AIzaSyC3sE1tn2_ZjQr1j2O6Z_VBVRw-ZErq_5A',
    appId: '1:855380930373:android:7fc4ee03ebfd414309582c',
    messagingSenderId: '855380930373',
    projectId: 'sukkanama-vehicle-rent',
    storageBucket: 'sukkanama-vehicle-rent.firebasestorage.app',
  );

  static const FirebaseOptions ios = FirebaseOptions(
    apiKey: 'AIzaSyDBvp9qXG425mBsQ-71kzcICw5-bSTNmoQ',
    appId: '1:855380930373:ios:80fd4863070e8eeb09582c',
    messagingSenderId: '855380930373',
    projectId: 'sukkanama-vehicle-rent',
    storageBucket: 'sukkanama-vehicle-rent.firebasestorage.app',
    iosBundleId: 'com.example.mobileApp',
  );

  static const FirebaseOptions macos = FirebaseOptions(
    apiKey: 'AIzaSyDBvp9qXG425mBsQ-71kzcICw5-bSTNmoQ',
    appId: '1:855380930373:ios:80fd4863070e8eeb09582c',
    messagingSenderId: '855380930373',
    projectId: 'sukkanama-vehicle-rent',
    storageBucket: 'sukkanama-vehicle-rent.firebasestorage.app',
    iosBundleId: 'com.example.mobileApp',
  );

  static const FirebaseOptions windows = FirebaseOptions(
    apiKey: 'AIzaSyAzkIjGOrJWnCqm2u5yzIGjFCq7ZydfLE4',
    appId: '1:855380930373:web:0758109124c08e2909582c',
    messagingSenderId: '855380930373',
    projectId: 'sukkanama-vehicle-rent',
    authDomain: 'sukkanama-vehicle-rent.firebaseapp.com',
    storageBucket: 'sukkanama-vehicle-rent.firebasestorage.app',
  );
}
