import 'package:flutter/material.dart';
import 'package:mobile_app/widgets/header.dart';
import 'package:mobile_app/widgets/footer.dart';
import 'package:mobile_app/widgets/customer_signup.dart';

class CustomerSignupScreen extends StatelessWidget {
  const CustomerSignupScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return const Scaffold(
      body: SingleChildScrollView(
        child: Column(
          children: [
            Header(),
            CustomerSignup(),
            Footer(),
          ],
        ),
      ),
    );
  }
}
