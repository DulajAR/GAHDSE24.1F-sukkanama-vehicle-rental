import 'package:flutter/material.dart';

// ✅ Common styles for header
class AppStyles {
  static const double padding = 16.0;
  static const double borderRadius = 8.0;
  static const Color primaryColor = Color(0xFF088178);

  static const TextStyle navText = TextStyle(
    fontSize: 16,
    fontWeight: FontWeight.w600,
    color: Colors.black,
  );

  static BoxDecoration headerDecoration = BoxDecoration(
    color: const Color(0xFFE3E6F3),
    boxShadow: [
      BoxShadow(
        color: Colors.black.withOpacity(0.06),
        blurRadius: 15,
        offset: const Offset(0, 5),
      ),
    ],
  );









 // Hero Section Styles
  static const double heroHeightFactor = 0.6;

  static const BoxDecoration heroBackground = BoxDecoration(
    image: DecorationImage(
      image: AssetImage('assets/hero4.png'),
      fit: BoxFit.cover,
    ),
  );

  static const TextStyle heroTitle = TextStyle(
    fontSize: 32,
    fontWeight: FontWeight.bold,
    color: Colors.white,
  );

  static const TextStyle heroSubtitle = TextStyle(
    fontSize: 24,
    color: Colors.white,
  );

  static const TextStyle heroDescription = TextStyle(
    fontSize: 18,
    color: Colors.white,
  );

  static final ButtonStyle heroButton = ElevatedButton.styleFrom(
    backgroundColor: Colors.white,
    foregroundColor: Colors.blue,
    padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
    shape: RoundedRectangleBorder(
      borderRadius: BorderRadius.circular(5),
    ),
  );

}
