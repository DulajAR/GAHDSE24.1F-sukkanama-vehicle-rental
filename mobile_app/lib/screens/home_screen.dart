import 'package:flutter/material.dart';
import 'package:mobile_app/widgets/header.dart';
import 'package:mobile_app/widgets/hero.dart'; // Import HeroSection
import 'package:mobile_app/widgets/feature.dart'; // Import Feature widget
import 'package:mobile_app/widgets/banner.dart'; // Import BannerSection

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
            // Removed the Expanded widget around the Text widget
            Center(
              child: Text(
                "Welcome to Sukkanama!",
                style: Theme.of(context).textTheme.bodyMedium,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
