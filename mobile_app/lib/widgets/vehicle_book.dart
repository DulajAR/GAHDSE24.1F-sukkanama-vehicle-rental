import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';

class VehicleBook extends StatefulWidget {
  final String vehicleId;
  final String vehicleOwnerId;
  final String customerId;
  final String customerEmail;

  const VehicleBook({
    super.key,
    required this.vehicleId,
    required this.vehicleOwnerId,
    required this.customerId,
    required this.customerEmail,
  });

  @override
  State<VehicleBook> createState() => _VehicleBookState();
}

class _VehicleBookState extends State<VehicleBook> {
  final _formKey = GlobalKey<FormState>();
  final TextEditingController _phoneController = TextEditingController();
  DateTime? _startDate;
  DateTime? _endDate;
  bool _isLoading = false;

  Future<void> _submitBooking() async {
    if (!_formKey.currentState!.validate() || _startDate == null || _endDate == null) return;

    setState(() {
      _isLoading = true;
    });

    try {
      final bookingsSnapshot = await FirebaseFirestore.instance
          .collection('bookings')
          .where('vehicleId', isEqualTo: widget.vehicleId)
          .where('status', isEqualTo: 'Accepted') // Only check accepted bookings
          .get();

      final newStart = _startDate!;
      final newEnd = _endDate!;

      bool isOverlapping = false;

      for (var doc in bookingsSnapshot.docs) {
        final existingStart = DateTime.parse(doc['startDate']);
        final existingEnd = DateTime.parse(doc['endDate']);

        if (!(newEnd.isBefore(existingStart) || newStart.isAfter(existingEnd))) {
          isOverlapping = true;
          break;
        }
      }

      if (isOverlapping) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text("Vehicle is not available for the selected dates.")),
        );
        setState(() {
          _isLoading = false;
        });
        return;
      }

      await FirebaseFirestore.instance.collection('bookings').add({
        'customerId': widget.customerId,
        'customerEmail': widget.customerEmail,
        'vehicleId': widget.vehicleId,
        'vehicleOwnerId': widget.vehicleOwnerId,
        'phone': _phoneController.text.trim(),
        'startDate': _startDate!.toIso8601String().split("T").first,
        'endDate': _endDate!.toIso8601String().split("T").first,
        'status': 'Pending',
        'createdAt': Timestamp.now(),
      });

      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text("Booking submitted successfully")),
      );

      Navigator.pop(context);

    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text("Error: ${e.toString()}")),
      );
    } finally {
      setState(() {
        _isLoading = false;
      });
    }
  }

  Future<void> _pickDate(bool isStartDate) async {
    final selected = await showDatePicker(
      context: context,
      initialDate: DateTime.now(),
      firstDate: DateTime.now(),
      lastDate: DateTime(2030),
    );

    if (selected != null) {
      setState(() {
        if (isStartDate) {
          _startDate = selected;
          // Reset endDate if it's before startDate
          if (_endDate != null && _endDate!.isBefore(selected)) {
            _endDate = null;
          }
        } else {
          _endDate = selected;
        }
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return _isLoading
        ? const Center(child: CircularProgressIndicator())
        : SingleChildScrollView(
            padding: const EdgeInsets.all(16),
            child: Form(
              key: _formKey,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  TextFormField(
                    controller: _phoneController,
                    keyboardType: TextInputType.phone,
                    decoration: const InputDecoration(labelText: "Phone Number"),
                    validator: (value) =>
                        value == null || value.isEmpty ? "Enter phone number" : null,
                  ),
                  const SizedBox(height: 16),
                  ListTile(
                    title: Text(
                      _startDate == null
                          ? "Select Start Date"
                          : "Start Date: ${_startDate!.toLocal().toString().split(' ')[0]}",
                    ),
                    trailing: const Icon(Icons.calendar_today),
                    onTap: () => _pickDate(true),
                  ),
                  ListTile(
                    title: Text(
                      _endDate == null
                          ? "Select End Date"
                          : "End Date: ${_endDate!.toLocal().toString().split(' ')[0]}",
                    ),
                    trailing: const Icon(Icons.calendar_today),
                    onTap: () => _pickDate(false),
                  ),
                  const SizedBox(height: 24),
                  Center(
                    child: ElevatedButton(
                      onPressed: _submitBooking,
                      child: const Text("Confirm Booking"),
                    ),
                  ),
                ],
              ),
            ),
          );
  }
}
