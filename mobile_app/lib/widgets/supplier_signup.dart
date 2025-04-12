import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:mobile_app/screens/supplier_login_screen.dart';

class SupplierSignup extends StatefulWidget {
  const SupplierSignup({super.key});

  @override
  State<SupplierSignup> createState() => _SupplierSignupState();
}

class _SupplierSignupState extends State<SupplierSignup> {
  final _formKey = GlobalKey<FormState>();

  final _fNameController = TextEditingController();
  final _lNameController = TextEditingController();
  final _emailController = TextEditingController();
  final _nicController = TextEditingController();
  final _regDateController = TextEditingController();
  final _passwordController = TextEditingController();
  final _telController = TextEditingController();
  final _taxIdController = TextEditingController();

  String _message = '';
  bool _isLoading = false;

  Future<void> _selectDate(BuildContext context) async {
    final DateTime? picked = await showDatePicker(
      context: context,
      initialDate: DateTime.now(),
      firstDate: DateTime(1950),
      lastDate: DateTime(2101),
    );
    if (picked != null) {
      setState(() {
        _regDateController.text = "${picked.year}-${picked.month.toString().padLeft(2, '0')}-${picked.day.toString().padLeft(2, '0')}";
      });
    }
  }

  Future<void> _handleSignup() async {
    if (!_formKey.currentState!.validate()) return;

    setState(() {
      _isLoading = true;
      _message = '';
    });

    try {
      await FirebaseAuth.instance.createUserWithEmailAndPassword(
        email: _emailController.text.trim(),
        password: _passwordController.text.trim(),
      );

      await FirebaseFirestore.instance.collection('suppliers').add({
        'f_name': _fNameController.text.trim(),
        'l_name': _lNameController.text.trim(),
        'email': _emailController.text.trim(),
        'nic': _nicController.text.trim(),
        'reg_date': _regDateController.text.trim(),
        'tel_no': _telController.text.trim(),
        'tax_id': _taxIdController.text.trim(),
        'user_type': 'supplier',
      });

      setState(() => _message = "✅ Sign up successful!");

      showDialog(
        context: context,
        builder: (BuildContext context) {
          return AlertDialog(
            title: const Text('Signup Successful'),
            content: const Text('You have successfully signed up as a supplier.'),
            actions: [
              TextButton(
                onPressed: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(builder: (context) => const SupplierLoginScreen()),
                  );
                },
                child: const Text('Go to Login'),
              ),
            ],
          );
        },
      );
    } catch (e) {
      setState(() => _message = "❌ Error! ${e.toString()}");
    } finally {
      setState(() => _isLoading = false);
    }
  }

  InputDecoration _inputDecoration(String label) {
    return InputDecoration(
      labelText: label,
      labelStyle: const TextStyle(color: Colors.black87),
      filled: true,
      fillColor: Colors.grey[100],
      contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
      border: OutlineInputBorder(
        borderRadius: BorderRadius.circular(12),
        borderSide: BorderSide.none,
      ),
    );
  }

  @override
  void dispose() {
    _fNameController.dispose();
    _lNameController.dispose();
    _emailController.dispose();
    _nicController.dispose();
    _regDateController.dispose();
    _passwordController.dispose();
    _telController.dispose();
    _taxIdController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(20),
      child: Center(
        child: Card(
          elevation: 8,
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
          child: Padding(
            padding: const EdgeInsets.all(24),
            child: Form(
              key: _formKey,
              child: Column(
                children: [
                  if (_message.isNotEmpty)
                    Padding(
                      padding: const EdgeInsets.only(bottom: 10),
                      child: Text(
                        _message,
                        style: TextStyle(
                          fontSize: 16,
                          color: _message.contains("Error") ? Colors.red : Colors.green,
                        ),
                      ),
                    ),
                  TextFormField(
                    controller: _fNameController,
                    decoration: _inputDecoration("First Name"),
                    validator: (value) => value!.isEmpty ? 'Please enter first name' : null,
                  ),
                  const SizedBox(height: 12),
                  TextFormField(
                    controller: _lNameController,
                    decoration: _inputDecoration("Last Name"),
                    validator: (value) => value!.isEmpty ? 'Please enter last name' : null,
                  ),
                  const SizedBox(height: 12),
                  TextFormField(
                    controller: _emailController,
                    decoration: _inputDecoration("Email"),
                    keyboardType: TextInputType.emailAddress,
                    validator: (value) => value!.isEmpty ? 'Please enter email' : null,
                  ),
                  const SizedBox(height: 12),
                  TextFormField(
                    controller: _nicController,
                    decoration: _inputDecoration("NIC"),
                    validator: (value) => value!.isEmpty ? 'Please enter NIC' : null,
                  ),
                  const SizedBox(height: 12),

                  // 📅 Date Picker Field
                  TextFormField(
                    controller: _regDateController,
                    readOnly: true,
                    onTap: () => _selectDate(context),
                    decoration: _inputDecoration("Registration Date (YYYY-MM-DD)").copyWith(
                      suffixIcon: const Icon(Icons.calendar_today),
                    ),
                    validator: (value) => value!.isEmpty ? 'Please select a date' : null,
                  ),

                  const SizedBox(height: 12),
                  TextFormField(
                    controller: _passwordController,
                    decoration: _inputDecoration("Password"),
                    obscureText: true,
                    validator: (value) => value!.length < 6
                        ? 'Password must be at least 6 characters'
                        : null,
                  ),
                  const SizedBox(height: 12),
                  TextFormField(
                    controller: _telController,
                    decoration: _inputDecoration("Telephone Number"),
                    keyboardType: TextInputType.phone,
                    validator: (value) => value!.isEmpty ? 'Please enter telephone number' : null,
                  ),
                  const SizedBox(height: 12),
                  TextFormField(
                    controller: _taxIdController,
                    decoration: _inputDecoration("Tax ID"),
                    validator: (value) => value!.isEmpty ? 'Please enter Tax ID' : null,
                  ),
                  const SizedBox(height: 24),
                  SizedBox(
                    width: double.infinity,
                    child: ElevatedButton(
                      onPressed: _isLoading ? null : _handleSignup,
                      style: ElevatedButton.styleFrom(
                        padding: const EdgeInsets.symmetric(vertical: 14),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(10),
                        ),
                        backgroundColor: Colors.blueAccent,
                      ),
                      child: _isLoading
                          ? const CircularProgressIndicator(color: Colors.white)
                          : const Text("Sign Up", style: TextStyle(fontSize: 16)),
                    ),
                  ),
                  const SizedBox(height: 16),
                  TextButton(
                    onPressed: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(builder: (context) => const SupplierLoginScreen()),
                      );
                    },
                    child: const Text(
                      "Already have an account? Login here",
                      style: TextStyle(color: Colors.blueGrey),
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
