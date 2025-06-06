import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';

class SupplierAddNewVehicle extends StatefulWidget {
  final String email;

  const SupplierAddNewVehicle({super.key, required this.email});

  @override
  State<SupplierAddNewVehicle> createState() => _SupplierAddNewVehicleState();
}

class _SupplierAddNewVehicleState extends State<SupplierAddNewVehicle> {
  final _formKey = GlobalKey<FormState>();
  final Map<String, String> _vehicleData = {};

  String? userId;

  @override
  void initState() {
    super.initState();
    fetchUserId();
  }

  Future<void> fetchUserId() async {
    try {
      final snapshot = await FirebaseFirestore.instance
          .collection('suppliers')
          .where('email', isEqualTo: widget.email)
          .limit(1)
          .get();

      if (snapshot.docs.isNotEmpty) {
        setState(() {
          userId = snapshot.docs.first.id;
        });
      }
    } catch (e) {
      print("Error fetching user ID: $e");
    }
  }

  Future<void> _submitForm() async {
    if (_formKey.currentState!.validate() && userId != null) {
      _formKey.currentState!.save();

      try {
        await FirebaseFirestore.instance.collection('vehicles').add({
          ..._vehicleData,
          'userEmail': widget.email,
          'userId': userId,
          'createdAt': Timestamp.now(),
        });

        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text("Vehicle added successfully!")),
        );
        _formKey.currentState!.reset();
      } catch (e) {
        print("Error adding vehicle: $e");
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return userId == null
        ? const Center(child: CircularProgressIndicator())
        : Padding(
            padding: const EdgeInsets.all(16.0),
            child: Form(
              key: _formKey,
              child: Column(
                children: [
                  _buildTextField('brand', 'Brand'),
                  _buildTextField('model', 'Model'),
                  _buildTextField('color', 'Color'),
                  _buildTextField('plate', 'Plate Number'),
                  _buildTextField('yom', 'Year of Manufacture'),
                  _buildTextField('eng_capacity', 'Engine Capacity'),
                  _buildTextField('f_type', 'Fuel Type'),
                  _buildTextField('t_mission', 'Transmission'),
                  _buildTextField('seat_capacity', 'Seat Capacity'),
                  _buildTextField('no_of_doors', 'No. of Doors'),
                  _buildTextField('per_day_chrg', 'Per Day Charge'),
                  _buildTextField('description', 'Description'),
                  _buildTextField('vehicleImageUrl', 'Vehicle Image URL'),
                  _buildTextField('view360ImageUrl', '360 View Image URL'),
                  const SizedBox(height: 20),
                  ElevatedButton(
                    onPressed: _submitForm,
                    child: const Text('Submit Vehicle'),
                  ),
                ],
              ),
            ),
          );
  }

  Widget _buildTextField(String key, String label) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8),
      child: TextFormField(
        decoration: InputDecoration(
          labelText: label,
          border: OutlineInputBorder(),
        ),
        validator: (value) => value == null || value.isEmpty ? 'Required' : null,
        onSaved: (value) => _vehicleData[key] = value!,
      ),
    );
  }
}
