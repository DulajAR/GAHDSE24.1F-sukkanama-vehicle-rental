import 'package:flutter/material.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:mobile_app/screens/customer_dashboard_screen.dart';
import 'package:mobile_app/screens/customer_signup_screen.dart'; // ✅ Import the signup screen

class CustomerLogin extends StatefulWidget {
  const CustomerLogin({super.key});

  @override
  _CustomerLoginState createState() => _CustomerLoginState();
}

class _CustomerLoginState extends State<CustomerLogin> {
  final _formKey = GlobalKey<FormState>();
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();

  Future<void> _loginCustomer() async {
    if (_formKey.currentState!.validate()) {
      try {
        final credential = await FirebaseAuth.instance.signInWithEmailAndPassword(
          email: _emailController.text.trim(),
          password: _passwordController.text,
        );

        // 🔍 Fetch additional customer info from Firestore
        final userDoc = await FirebaseFirestore.instance
            .collection('customers')
            .doc(credential.user!.uid)
            .get();

        if (!userDoc.exists) {
          throw FirebaseAuthException(
            code: 'user-not-found',
            message: 'Customer record not found.',
          );
        }

        // ✅ Show success dialog and navigate
        showDialog(
          context: context,
          barrierDismissible: false,
          builder: (_) => AlertDialog(
            title: const Text("Login Successful"),
            content: const Text("Welcome back, customer!"),
            actions: [
              TextButton(
                onPressed: () {
                  Navigator.of(context).pop(); // Close dialog
                  Navigator.pushReplacement(
                    context,
                    MaterialPageRoute(
                      builder: (context) => CustomerDashboardScreen(
                        email: _emailController.text.trim(),
                      ),
                    ),
                  );
                },
                child: const Text("OK"),
              ),
            ],
          ),
        );
      } on FirebaseAuthException catch (e) {
        showDialog(
          context: context,
          builder: (_) => AlertDialog(
            title: const Text("Login Failed"),
            content: Text(e.message ?? "An unknown error occurred."),
            actions: [
              TextButton(
                onPressed: () => Navigator.of(context).pop(),
                child: const Text("OK"),
              ),
            ],
          ),
        );
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Container(
        padding: const EdgeInsets.all(24.0),
        margin: const EdgeInsets.symmetric(horizontal: 24.0, vertical: 40.0),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(16),
          boxShadow: [
            BoxShadow(
              color: Colors.grey.withOpacity(0.3),
              blurRadius: 10,
              offset: const Offset(0, 4),
            ),
          ],
        ),
        child: Form(
          key: _formKey,
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              const Text(
                'Customer Login',
                style: TextStyle(
                  fontSize: 24,
                  fontWeight: FontWeight.bold,
                  color: Colors.teal,
                ),
              ),
              const SizedBox(height: 20),
              TextFormField(
                controller: _emailController,
                decoration: const InputDecoration(
                  labelText: 'Email',
                  border: OutlineInputBorder(),
                ),
                validator: (value) {
                  if (value == null || value.isEmpty || !value.contains('@')) {
                    return 'Enter a valid email address';
                  }
                  return null;
                },
              ),
              const SizedBox(height: 16),
              TextFormField(
                controller: _passwordController,
                obscureText: true,
                decoration: const InputDecoration(
                  labelText: 'Password (min 6 characters)',
                  border: OutlineInputBorder(),
                ),
                validator: (value) {
                  if (value == null || value.length < 6) {
                    return 'Password must be at least 6 characters';
                  }
                  return null;
                },
              ),
              const SizedBox(height: 20),
              ElevatedButton(
                onPressed: _loginCustomer,
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.teal,
                  padding: const EdgeInsets.symmetric(vertical: 14),
                  textStyle: const TextStyle(fontSize: 16),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(8),
                  ),
                  minimumSize: const Size(double.infinity, 45),
                ),
                child: const Text('Login'),
              ),
              const SizedBox(height: 16),
              TextButton(
                onPressed: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) => const CustomerSignupScreen(), // ✅ Navigate to signup
                    ),
                  );
                },
                child: const Text("Not registered? Register here"),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
