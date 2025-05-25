// lib/screens/supplier_dashboard_screen.dart

import 'package:flutter/material.dart';
import 'package:mobile_app/widgets/header.dart';
import 'package:mobile_app/widgets/news_latter.dart';
import 'package:mobile_app/widgets/footer.dart';
import 'package:mobile_app/widgets/supplier_dashboard.dart';

class SupplierDashboardScreen extends StatelessWidget {
  const SupplierDashboardScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SingleChildScrollView(
        child: Column(
          children: const [
            Header(),
            SupplierDashboard(),
            NewsLetter(),
            Footer(),
          ],
        ),
      ),
    );
  }
}
