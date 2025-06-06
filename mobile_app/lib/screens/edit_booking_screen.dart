import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';

class EditBookingScreen extends StatefulWidget {
  final String bookingId;
  final Map<String, dynamic> bookingData;

  const EditBookingScreen({
    super.key,
    required this.bookingId,
    required this.bookingData,
  });

  @override
  State<EditBookingScreen> createState() => _EditBookingScreenState();
}

class _EditBookingScreenState extends State<EditBookingScreen> {
  final _formKey = GlobalKey<FormState>();

  late TextEditingController _startDateController;
  late TextEditingController _endDateController;
  late TextEditingController _phoneController;

  @override
  void initState() {
    super.initState();
    _startDateController = TextEditingController(text: widget.bookingData['startDate']);
    _endDateController = TextEditingController(text: widget.bookingData['endDate']);
    _phoneController = TextEditingController(text: widget.bookingData['phone']);
  }

  Future<void> _updateBooking() async {
    if (_formKey.currentState!.validate()) {
      try {
        await FirebaseFirestore.instance
            .collection('bookings')
            .doc(widget.bookingId)
            .update({
          'startDate': _startDateController.text.trim(),
          'endDate': _endDateController.text.trim(),
          'phone': _phoneController.text.trim(),
        });

        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('✅ Booking updated successfully')),
        );

        Navigator.pop(context); // go back after update
      } catch (e) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('❌ Error updating booking: $e')),
        );
      }
    }
  }

  @override
  void dispose() {
    _startDateController.dispose();
    _endDateController.dispose();
    _phoneController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Edit Booking")),
      body: Padding(
        padding: const EdgeInsets.all(20),
        child: Form(
          key: _formKey,
          child: ListView(
            children: [
              Text("Booking ID: ${widget.bookingId}",
                  style: const TextStyle(fontWeight: FontWeight.bold)),
              const SizedBox(height: 20),

              TextFormField(
                controller: _startDateController,
                decoration: const InputDecoration(labelText: "Start Date (YYYY-MM-DD)"),
                validator: (value) => value!.isEmpty ? "Enter start date" : null,
              ),
              const SizedBox(height: 10),

              TextFormField(
                controller: _endDateController,
                decoration: const InputDecoration(labelText: "End Date (YYYY-MM-DD)"),
                validator: (value) => value!.isEmpty ? "Enter end date" : null,
              ),
              const SizedBox(height: 10),

              TextFormField(
                controller: _phoneController,
                decoration: const InputDecoration(labelText: "Phone Number"),
                keyboardType: TextInputType.phone,
                validator: (value) => value!.isEmpty ? "Enter phone number" : null,
              ),
              const SizedBox(height: 20),

              ElevatedButton.icon(
                icon: const Icon(Icons.save),
                label: const Text("Update Booking"),
                onPressed: _updateBooking,
              ),
            ],
          ),
        ),
      ),
    );
  }
}
