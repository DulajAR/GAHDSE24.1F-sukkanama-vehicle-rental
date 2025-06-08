import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';

class SupplierViewBookings extends StatefulWidget {
  final String supplierEmail;

  const SupplierViewBookings({super.key, required this.supplierEmail});

  @override
  State<SupplierViewBookings> createState() => _SupplierViewBookingsState();
}

class _SupplierViewBookingsState extends State<SupplierViewBookings> {
  String? supplierId;
  bool isLoading = true;

  Map<String, Map<String, dynamic>> vehiclesMap = {};
  Map<String, Map<String, dynamic>> customersMap = {};

  @override
  void initState() {
    super.initState();
    fetchSupplierId();
  }

  Future<void> fetchSupplierId() async {
    try {
      final snapshot = await FirebaseFirestore.instance
          .collection('suppliers')
          .where('email', isEqualTo: widget.supplierEmail)
          .limit(1)
          .get();

      if (snapshot.docs.isNotEmpty) {
        supplierId = snapshot.docs.first.id;
      }

      setState(() => isLoading = false);
    } catch (e) {
      print("Error fetching supplier ID: $e");
      setState(() => isLoading = false);
    }
  }

  Future<void> updateBookingStatus(String bookingId, String newStatus) async {
    try {
      await FirebaseFirestore.instance
          .collection('bookings')
          .doc(bookingId)
          .update({'status': newStatus});
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Booking $newStatus')),
      );
    } catch (e) {
      print("Error updating booking status: $e");
    }
  }

  Future<void> deleteBooking(String bookingId) async {
    try {
      await FirebaseFirestore.instance
          .collection('bookings')
          .doc(bookingId)
          .delete();
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Booking deleted')),
      );
    } catch (e) {
      print("Error deleting booking: $e");
    }
  }

  Future<void> fetchVehiclesAndCustomers(
      List<String> vehicleIds, List<String> customerIds) async {
    try {
      if (vehicleIds.isNotEmpty) {
        final vehicleSnap = await FirebaseFirestore.instance
            .collection('vehicles')
            .where(FieldPath.documentId, whereIn: vehicleIds)
            .get();

        vehiclesMap = {
          for (var doc in vehicleSnap.docs) doc.id: doc.data(),
        };
      }

      if (customerIds.isNotEmpty) {
        final customerSnap = await FirebaseFirestore.instance
            .collection('customers')
            .where(FieldPath.documentId, whereIn: customerIds)
            .get();

        customersMap = {
          for (var doc in customerSnap.docs) doc.id: doc.data(),
        };
      }
    } catch (e) {
      print("Error fetching vehicle/customer data: $e");
    }
  }

  @override
  Widget build(BuildContext context) {
    if (isLoading) return const Center(child: CircularProgressIndicator());

    if (supplierId == null) {
      return const Center(child: Text('Supplier not found.'));
    }

    final bookingsStream = FirebaseFirestore.instance
        .collection('bookings')
        .where('vehicleOwnerId', isEqualTo: supplierId)
        .orderBy('createdAt', descending: true)
        .snapshots();

    return StreamBuilder<QuerySnapshot>(
      stream: bookingsStream,
      builder: (context, snapshot) {
        if (snapshot.hasError) {
          return Center(child: Text('Error: ${snapshot.error}'));
        }

        if (snapshot.connectionState == ConnectionState.waiting) {
          return const Center(child: CircularProgressIndicator());
        }

        final bookings = snapshot.data!.docs;

        if (bookings.isEmpty) {
          return const Center(child: Text('No bookings found.'));
        }

        final vehicleIds = <String>{};
        final customerIds = <String>{};

        for (var booking in bookings) {
          final data = booking.data() as Map<String, dynamic>;
          vehicleIds.add(data['vehicleId']);
          customerIds.add(data['customerId']);
        }

        return FutureBuilder(
          future: fetchVehiclesAndCustomers(vehicleIds.toList(), customerIds.toList()),
          builder: (context, snapshot) {
            if (snapshot.connectionState == ConnectionState.waiting) {
              return const Center(child: CircularProgressIndicator());
            }

            return ListView.builder(
              itemCount: bookings.length,
              itemBuilder: (context, index) {
                final booking = bookings[index];
                final data = booking.data() as Map<String, dynamic>;

                final vehicleData = vehiclesMap[data['vehicleId']];
                final customerData = customersMap[data['customerId']];

                if (vehicleData == null || customerData == null) {
                  return ListTile(title: Text('Missing related data.'));
                }

                return Card(
                  margin: const EdgeInsets.symmetric(vertical: 8, horizontal: 16),
                  elevation: 3,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Padding(
                    padding: const EdgeInsets.all(12),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          children: [
                            vehicleData['vehicleImageUrl'] != null
                                ? Image.network(
                                    vehicleData['vehicleImageUrl'],
                                    width: 100,
                                    height: 70,
                                    fit: BoxFit.cover,
                                  )
                                : Container(
                                    width: 100,
                                    height: 70,
                                    color: Colors.grey[300],
                                    child: const Icon(Icons.directions_car),
                                  ),
                            const SizedBox(width: 12),
                            Expanded(
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text(
                                    '${vehicleData['brand']} ${vehicleData['model']} (${vehicleData['plate']})',
                                    style: const TextStyle(
                                      fontSize: 16,
                                      fontWeight: FontWeight.bold,
                                    ),
                                  ),
                                  Text('Booking: ${data['startDate']} to ${data['endDate']}'),
                                  Text('Status: ${data['status']}'),
                                ],
                              ),
                            ),
                          ],
                        ),
                        const Divider(height: 20),
                        const Text(
                          'Customer Info',
                          style: TextStyle(
                            fontWeight: FontWeight.bold,
                            fontSize: 16,
                          ),
                        ),
                        Text('Name: ${customerData['f_name']} ${customerData['l_name']}'),
                        Text('Email: ${customerData['email']}'),
                        Text('Phone: ${customerData['tel_no']}'),
                        const SizedBox(height: 12),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.end,
                          children: [
                            ElevatedButton(
                              onPressed: data['status'] == 'Accepted'
                                  ? null
                                  : () => updateBookingStatus(booking.id, 'Accepted'),
                              style: ElevatedButton.styleFrom(backgroundColor: Colors.green),
                              child: const Text('Accept'),
                            ),
                            const SizedBox(width: 8),
                            ElevatedButton(
                              onPressed: data['status'] == 'Rejected'
                                  ? null
                                  : () => updateBookingStatus(booking.id, 'Rejected'),
                              style: ElevatedButton.styleFrom(backgroundColor: Colors.red),
                              child: const Text('Reject'),
                            ),
                            const SizedBox(width: 8),
                            ElevatedButton(
                              onPressed: () => deleteBooking(booking.id),
                              style: ElevatedButton.styleFrom(backgroundColor: Colors.grey),
                              child: const Text('Delete'),
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),
                );
              },
            );
          },
        );
      },
    );
  }
}
