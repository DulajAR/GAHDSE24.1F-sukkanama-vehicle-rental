import 'package:flutter/material.dart';
import 'package:mobile_app/widgets/supplier_view_bookings.dart';

class SupplierViewBookingsScreen extends StatelessWidget {
  final String email;

  const SupplierViewBookingsScreen({super.key, required this.email});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('View Bookings'),
      ),
      body: SupplierViewBookings(supplierEmail: email),
    );
  }
}
