import 'package:flutter/material.dart';
import 'package:mobile_app/widgets/header.dart';
import 'package:mobile_app/widgets/about.dart';
import 'package:mobile_app/widgets/feature.dart';
import 'package:mobile_app/widgets/news_latter.dart';
import 'package:mobile_app/widgets/footer.dart';

class AboutScreenPage extends StatelessWidget { // Renamed to avoid conflict
  const AboutScreenPage({super.key});

  @override
  Widget build(BuildContext context) {
    return const Scaffold(
      body: SingleChildScrollView(
        child: Column(
          children: [
            Header(),
            AboutContent(),      // This is the content widget (stateful)
            FeatureSection(),
            NewsLetter(),
            Footer(),
          ],
        ),
      ),
    );
  }
}
