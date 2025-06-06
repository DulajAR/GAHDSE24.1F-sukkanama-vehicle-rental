import 'package:flutter/material.dart';
import 'package:mobile_app/widgets/supplier_manage_listing.dart';

class SupplierManageListingScreen extends StatelessWidget {
  final String email;

  const SupplierManageListingScreen({super.key, required this.email});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("My Vehicle Listings"),
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () => Navigator.pop(context),
        ),
      ),
      body: SupplierManageListing(email: email),
    );
  }
}
