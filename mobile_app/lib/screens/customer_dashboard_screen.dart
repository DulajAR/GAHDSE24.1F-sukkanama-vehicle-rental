import 'package:flutter/material.dart';
import 'package:mobile_app/widgets/header.dart';
import 'package:mobile_app/widgets/news_latter.dart';
import 'package:mobile_app/widgets/footer.dart';
import 'package:mobile_app/widgets/customer_dashboard.dart';
import 'package:mobile_app/screens/customer_login_screen.dart'; // 👈 Import this

class CustomerDashboardScreen extends StatelessWidget {
  final String email;

  const CustomerDashboardScreen({super.key, required this.email});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF5F5F5),
      body: Column(
        children: [
          Expanded(
            child: SingleChildScrollView(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  const Header(),

                  // ✅ Back Button that navigates to CustomerLoginScreen
                  Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 10.0),
                    child: Align(
                      alignment: Alignment.centerLeft,
                      child: ElevatedButton.icon(
                        onPressed: () {
                          Navigator.pushReplacement(
                            context,
                            MaterialPageRoute(
                              builder: (context) => const CustomerLoginScreen(),
                            ),
                          );
                        },
                        icon: const Icon(Icons.logout),
                        label: const Text("Logout"),
                        style: ElevatedButton.styleFrom(
                          backgroundColor: Colors.blue,
                          foregroundColor: Colors.white,
                          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(8),
                          ),
                        ),
                      ),
                    ),
                  ),

                  CustomerDashboard(email: email),
                  const SizedBox(height: 20),
                  const NewsLetter(),
                  const Footer(),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
