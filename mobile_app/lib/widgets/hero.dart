import 'package:flutter/material.dart';
import 'package:get/get.dart';
import '../styles.dart'; // Import global styles

class HeroSection extends StatelessWidget {
  const HeroSection({super.key});

  void browseVehicles() {
    Get.toNamed('/loginCustomer');
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      height: MediaQuery.of(context).size.height * AppStyles.heroHeightFactor,
      decoration: AppStyles.heroBackground,
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          const Text('Sukkanama', style: AppStyles.heroTitle),
          const SizedBox(height: 10),
          const Text('Super Value Vehicles', style: AppStyles.heroSubtitle),
          const SizedBox(height: 10),
          const Text(
            'Save time, connect with us!',
            style: AppStyles.heroDescription,
            textAlign: TextAlign.center,
          ),
          const SizedBox(height: 20),
          ElevatedButton(
            onPressed: browseVehicles,
            style: AppStyles.heroButton,
            child: const Text('Browse Now', style: TextStyle(fontSize: 16)),
          ),
        ],
      ),
    );
  }
}
