import 'package:flutter/material.dart';
import 'package:mobile_app/widgets/header.dart';
import 'package:mobile_app/widgets/hero.dart'; // Import HeroSection
import 'package:mobile_app/widgets/feature.dart'; // Import Feature widget
import 'package:mobile_app/widgets/vehicle_ads.dart'; // Import VehicleAds widget

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Header(), // ✅ Header at the top
            const HeroSection(), // ✅ Hero Section added below Header
            const FeatureSection(), // ✅ Feature widget added below Hero Section
            VehicleAds(), // ✅ VehicleAds widget added below Feature Section
          ],
        ),
      ),
    );
  }
}
