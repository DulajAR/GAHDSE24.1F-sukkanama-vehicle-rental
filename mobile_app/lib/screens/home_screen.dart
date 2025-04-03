import 'package:flutter/material.dart';
import 'package:mobile_app/widgets/header.dart';
import 'package:mobile_app/widgets/hero.dart'; // Import HeroSection
import 'package:mobile_app/widgets/feature.dart'; // Import Feature widget
import 'package:mobile_app/widgets/banner.dart'; // Import BannerSection
import 'package:mobile_app/widgets/vehicle_ads.dart'; // Import VehicleAds widget
import 'package:mobile_app/widgets/small_banner.dart'; // Import SmallBanner
import 'package:mobile_app/widgets/news_latter.dart'; // ✅ Import the Newsletter widget
import 'package:mobile_app/widgets/footer.dart'; // ✅ Import Footer widget

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SingleChildScrollView( // Wrapping Column with SingleChildScrollView for scrollability
        child: Column(
          children: [
            const Header(), // ✅ Header at the top
            const HeroSection(), // ✅ Hero Section added below Header
            const FeatureSection(), // ✅ Feature widget added below Hero Section
            const BannerSection(), // ✅ BannerSection added below Feature Section
            VehicleAds(), // ✅ VehicleAds widget added below Banner Section
            const SmallBanner(), // ✅ Small Banner section
            const SizedBox(height: 20), // ✅ Spacing before Newsletter
            const NewsLetter(), // ✅ Newsletter widget at the bottom
            const Footer(), // ✅ Footer at the very bottom
          ],
        ),
      ),
    );
  }
}