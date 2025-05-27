// lib/screens/customer_dashboard_screen.dart

import 'package:flutter/material.dart';
import 'package:mobile_app/widgets/header.dart';
import 'package:mobile_app/widgets/news_latter.dart';
import 'package:mobile_app/widgets/footer.dart';
import 'package:mobile_app/widgets/customer_dashboard.dart';

class CustomerDashboardScreen extends StatelessWidget {
  final String email;

  const CustomerDashboardScreen({super.key, required this.email});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF5F5F5),
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            const Header(),
            CustomerDashboard(email: email),
            const SizedBox(height: 20),
            const NewsLetter(),
            const Footer(),
          ],
        ),
      ),
    );
  }
}
