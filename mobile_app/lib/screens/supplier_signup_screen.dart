// lib/screens/supplier_signup_screen.dart
import 'package:flutter/material.dart';
import 'package:mobile_app/widgets/header.dart';
import 'package:mobile_app/widgets/footer.dart';
import 'package:mobile_app/widgets/supplier_signup.dart'; // This is your signup form widget

class SupplierSignupScreen extends StatelessWidget {
  const SupplierSignupScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SingleChildScrollView(
        child: Column(
          children: [
            const Header(),
            const SupplierSignup(), // Your signup form widget
            const Footer(),
          ],
        ),
      ),
    );
  }
}
