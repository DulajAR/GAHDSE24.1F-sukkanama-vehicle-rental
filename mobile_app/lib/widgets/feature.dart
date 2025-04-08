import 'package:flutter/material.dart';
import 'package:mobile_app/styles.dart'; // Import the styles file

class FeatureSection extends StatelessWidget {
  const FeatureSection({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(vertical: 20, horizontal: 10),
      child: const Row(
        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        children: [
          FeatureBox(image: 'assets/f1.png', title: '100% Trusted Service', color: AppStyles.feature1Color),
          FeatureBox(image: 'assets/f2.png', title: 'Easy Booking', color: AppStyles.feature2Color),
          FeatureBox(image: 'assets/f3.png', title: '24/7 Service', color: AppStyles.feature3Color),
          FeatureBox(image: 'assets/f4.png', title: 'Virtual Vehicle Tours', color: AppStyles.feature4Color),
          FeatureBox(image: 'assets/f5.png', title: 'Booking Calendar', color: AppStyles.feature5Color),
        ],
      ),
    );
  }
}

class FeatureBox extends StatelessWidget {
  final String image;
  final String title;
  final Color color;

  const FeatureBox({
    required this.image,
    required this.title,
    required this.color,
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    return MouseRegion(
      onEnter: (_) => print('Hovered over $title'), // Optional hover effect
      child: Container(
        width: MediaQuery.of(context).size.width * AppStyles.featureBoxWidthFactor,
        height: AppStyles.featureBoxHeight,
        padding: const EdgeInsets.symmetric(vertical: 10, horizontal: 5),
        decoration: AppStyles.featureBoxDecoration,
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Image.asset(image, width: 100),
            const SizedBox(height: 10),
            Container(
              padding: const EdgeInsets.all(8),
              decoration: AppStyles.featureBoxTitleDecoration(color),
              child: Text(
                title,
                style: const TextStyle(
                  color: Colors.black,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
