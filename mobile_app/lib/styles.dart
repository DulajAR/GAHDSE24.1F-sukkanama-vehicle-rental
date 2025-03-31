import 'package:flutter/material.dart';

// ✅ Common styles for header
class AppStyles {
  // General constants
  static const double padding = 16.0;
  static const double borderRadius = 8.0;
  static const Color primaryColor = Color(0xFF088178);

  // Header Text Style
  static const TextStyle navText = TextStyle(
    fontSize: 16,
    fontWeight: FontWeight.w600,
    color: Colors.black,
  );

  // Header BoxDecoration
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

  // Feature Section Colors
  static const feature1Color = Color(0xFFFDDDE4); // 100% Trusted Service
  static const feature2Color = Color(0xFFA1C78B); // Easy Booking
  static const feature3Color = Color(0xFFD1E8F2); // 24/7 Service
  static const feature4Color = Color(0xFFCDD4F8); // Virtual Vehicle Tours
  static const feature5Color = Color(0xFFF6DBF6); // Booking Calendar

  // Feature Box Style Constants
  static const double featureBoxHeight = 200.0; // Height for all feature boxes
  static const double featureBoxWidthFactor = 0.18; // Width factor for responsive design

  // Box Shadow for Feature Box
  static final BoxDecoration featureBoxDecoration = BoxDecoration(
    borderRadius: BorderRadius.circular(4),
    border: Border.all(color: Colors.grey.withOpacity(0.3)),
    boxShadow: [
      BoxShadow(
        offset: Offset(0, 4),
        blurRadius: 10,
        color: Colors.black.withOpacity(0.05),
      ),
    ],
    color: Colors.white,
  );

  // Box Decoration for Feature Box Title
  static BoxDecoration featureBoxTitleDecoration(Color color) {
    return BoxDecoration(
      color: color,
      borderRadius: BorderRadius.circular(4),
    );
  }
}

// Banner Text Styles
class BannerTextStyles {
  static const TextStyle heading4 = TextStyle(
    fontSize: 24.0, // Adjusted size similar to your h4
    color: Colors.white,
  );

  static const TextStyle heading2 = TextStyle(
    fontSize: 32.0, // Adjusted size similar to your h2
    color: Colors.white,
    fontWeight: FontWeight.bold,
  );

  static final ButtonStyle buttonStyle = ElevatedButton.styleFrom(
    backgroundColor: Colors.white, // Replaces 'primary' with 'backgroundColor'
    foregroundColor: Color(0xFF007BFF), // Replaces 'onPrimary' with 'foregroundColor'
    padding: EdgeInsets.symmetric(vertical: 10.0, horizontal: 20.0),
    shape: RoundedRectangleBorder(
      borderRadius: BorderRadius.circular(5.0),
    ),
  );
}
