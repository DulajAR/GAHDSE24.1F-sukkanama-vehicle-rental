import 'package:flutter/material.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:mobile_app/widgets/customer_bookings.dart';


class CustomerBookingsScreen extends StatelessWidget {
  const CustomerBookingsScreen({super.key, required String email});

  @override
  Widget build(BuildContext context) {
    final user = FirebaseAuth.instance.currentUser;

    if (user == null) {
      return const Scaffold(
        body: Center(child: Text("User not logged in.")),
      );
    }

    return Scaffold(
      appBar: AppBar(
        title: const Text("My Bookings"),
        backgroundColor: Colors.teal,
      ),
      body: CustomerBookings(email: user.email!),
    );
  }
}
