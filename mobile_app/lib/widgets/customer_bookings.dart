import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';
import 'package:mobile_app/screens/edit_booking_screen.dart';

class CustomerBookings extends StatelessWidget {
  final String email;

  const CustomerBookings({super.key, required this.email});

  Future<void> deleteBooking(String bookingId) async {
    try {
      await FirebaseFirestore.instance.collection('bookings').doc(bookingId).delete();
    } catch (e) {
      print("❌ Error deleting booking: $e");
    }
  }

  Future<Map<String, dynamic>?> fetchVehicleAndOwnerData(String vehicleId, String ownerId) async {
    try {
      final vehicleDoc = await FirebaseFirestore.instance.collection('vehicles').doc(vehicleId).get();
      final ownerDoc = await FirebaseFirestore.instance.collection('suppliers').doc(ownerId).get();

      if (vehicleDoc.exists && ownerDoc.exists) {
        return {
          'vehicle': vehicleDoc.data(),
          'owner': ownerDoc.data(),
        };
      }
    } catch (e) {
      print("❌ Error fetching related data: $e");
    }
    return null;
  }

  @override
  Widget build(BuildContext context) {
    print("📧 Looking for bookings of email: $email");

    return StreamBuilder<QuerySnapshot>(
      stream: FirebaseFirestore.instance
          .collection('bookings')
          .where('customerEmail', isEqualTo: email)
          .snapshots(),
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return const Center(child: CircularProgressIndicator());
        }

        if (snapshot.hasError) {
          return Center(child: Text("Error: ${snapshot.error}"));
        }

        if (!snapshot.hasData || snapshot.data!.docs.isEmpty) {
          return const Center(child: Text("No bookings found."));
        }

        final bookings = snapshot.data!.docs;

        return ListView.builder(
          itemCount: bookings.length,
          itemBuilder: (context, index) {
            final booking = bookings[index];
            final data = booking.data() as Map<String, dynamic>;

            return FutureBuilder<Map<String, dynamic>?>(
              future: fetchVehicleAndOwnerData(data['vehicleId'], data['vehicleOwnerId']),
              builder: (context, snapshot) {
                if (!snapshot.hasData) {
                  return const Padding(
                    padding: EdgeInsets.all(16),
                    child: Center(child: CircularProgressIndicator()),
                  );
                }

                final vehicle = snapshot.data!['vehicle'] ?? {};
                final owner = snapshot.data!['owner'] ?? {};

                return Card(
                  elevation: 5,
                  margin: const EdgeInsets.symmetric(vertical: 10, horizontal: 16),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                  child: Padding(
                    padding: const EdgeInsets.all(16),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        // Vehicle image
                        if (vehicle['vehicleImageUrl'] != null)
                          ClipRRect(
                            borderRadius: BorderRadius.circular(10),
                            child: Image.network(
                              vehicle['vehicleImageUrl'],
                              height: 180,
                              width: double.infinity,
                              fit: BoxFit.cover,
                            ),
                          ),
                        const SizedBox(height: 12),
                        Text("📅 From ${data['startDate']} to ${data['endDate']}", style: const TextStyle(fontWeight: FontWeight.bold)),
                        const SizedBox(height: 6),
                        Text("📞 Customer Phone: ${data['phone']}"),
                        Text("🚗 Vehicle ID: ${data['vehicleId']}"),
                        Text("🧾 Status: ${data['status']}"),
                        const Divider(height: 20),
                        Text("👨‍🔧 Owner: ${owner['f_name']} ${owner['l_name']}", style: const TextStyle(fontWeight: FontWeight.w600)),
                        Text("📱 Owner Phone: ${owner['tel_no']}"),
                        const SizedBox(height: 10),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.end,
                          children: [
                            TextButton.icon(
                              icon: const Icon(Icons.edit, color: Colors.blue),
                              label: const Text("Edit"),
                              onPressed: () {
                                Navigator.push(
                                  context,
                                  MaterialPageRoute(
                                    builder: (context) => EditBookingScreen(
                                      bookingId: booking.id,
                                      bookingData: data,
                                    ),
                                  ),
                                );
                              },
                            ),
                            TextButton.icon(
                              icon: const Icon(Icons.delete, color: Colors.red),
                              label: const Text("Delete"),
                              onPressed: () async {
                                final confirm = await showDialog(
                                  context: context,
                                  builder: (ctx) => AlertDialog(
                                    title: const Text("Confirm Deletion"),
                                    content: const Text("Are you sure you want to delete this booking?"),
                                    actions: [
                                      TextButton(onPressed: () => Navigator.pop(ctx, false), child: const Text("Cancel")),
                                      TextButton(onPressed: () => Navigator.pop(ctx, true), child: const Text("Delete")),
                                    ],
                                  ),
                                );

                                if (confirm == true) {
                                  await deleteBooking(booking.id);
                                }
                              },
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
