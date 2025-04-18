import 'package:flutter/material.dart';
import 'package:mobile_app/widgets/header.dart';
import 'package:mobile_app/widgets/footer.dart';
import 'package:mobile_app/widgets/supplier_login.dart'; // This is your login form widget

class SupplierLoginScreen extends StatelessWidget {
  const SupplierLoginScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return const Scaffold(
      body: SingleChildScrollView(
        child: Column(
          children: [
            Header(),
            SupplierLogin(), // Your form widget
            Footer(),
          ],
        ),
      ),
    );
  }
}
