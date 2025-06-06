import 'package:flutter/material.dart';
import 'package:mobile_app/widgets/vehicle_book.dart';


class VehicleBookScreen extends StatelessWidget {
  final String vehicleId;
  final String vehicleOwnerId;
  final String customerId;
  final String customerEmail;

  const VehicleBookScreen({
    super.key,
    required this.vehicleId,
    required this.vehicleOwnerId,
    required this.customerId,
    required this.customerEmail,
  });

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Book Vehicle")),
      body: VehicleBook(
        vehicleId: vehicleId,
        vehicleOwnerId: vehicleOwnerId,
        customerId: customerId,
        customerEmail: customerEmail,
      ),
    );
  }
}
