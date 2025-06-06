import 'package:flutter/material.dart';
import 'package:mobile_app/widgets/supplier_add_new_vehicle.dart';
import 'package:mobile_app/widgets/header.dart';

class SupplierAddNewVehicleScreen extends StatelessWidget {
  final String email;

  const SupplierAddNewVehicleScreen({super.key, required this.email});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF5F5F5),
      body: Column(
        children: [
          const Header(),
          Expanded(
            child: SingleChildScrollView(
              child: SupplierAddNewVehicle(email: email),
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: SizedBox(
              width: double.infinity,
              child: ElevatedButton.icon(
                onPressed: () {
                  Navigator.pop(context);
                },
                icon: const Icon(Icons.arrow_back),
                label: const Text("Back"),
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.grey[800],
                  foregroundColor: Colors.white,
                  padding: const EdgeInsets.symmetric(vertical: 16),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(12),
                  ),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
