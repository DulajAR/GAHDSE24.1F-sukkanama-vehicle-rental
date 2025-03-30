import 'package:flutter/material.dart';

// ✅ Common styles
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
}
