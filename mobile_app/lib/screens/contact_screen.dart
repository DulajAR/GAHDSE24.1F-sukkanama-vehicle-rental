import 'package:flutter/material.dart';
import 'package:mobile_app/widgets/header.dart';
import 'package:mobile_app/widgets/contact.dart';
import 'package:mobile_app/widgets/news_latter.dart';
import 'package:mobile_app/widgets/footer.dart';

class ContactScreenPage extends StatelessWidget {
  const ContactScreenPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SingleChildScrollView(
        child: Column(
          children: [
            const Header(),
            ContactPage(), // Now it's fixed
            const NewsLetter(),
            const Footer(),
          ],
        ),
      ),
    );
  }
}