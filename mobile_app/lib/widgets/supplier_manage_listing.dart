import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:mobile_app/screens/supplier_update_vehicle_screen.dart';

class SupplierManageListing extends StatelessWidget {
  final String email;

  const SupplierManageListing({super.key, required this.email});

  Future<void> deleteVehicle(String docId) async {
    try {
      await FirebaseFirestore.instance.collection('vehicles').doc(docId).delete();
    } catch (e) {
      print('Failed to delete vehicle: $e');
    }
  }

  @override
  Widget build(BuildContext context) {
    return StreamBuilder<QuerySnapshot>(
      stream: FirebaseFirestore.instance
          .collection('vehicles')
          .where('userEmail', isEqualTo: email)
          .snapshots(),
      builder: (context, snapshot) {
        if (snapshot.hasError) {
          return const Center(child: Text('Something went wrong.'));
        }

        if (snapshot.connectionState == ConnectionState.waiting) {
          return const Center(child: CircularProgressIndicator());
        }

        if (snapshot.data!.docs.isEmpty) {
          return const Center(child: Text("No vehicles found."));
        }

        return ListView(
          padding: const EdgeInsets.all(16),
          children: snapshot.data!.docs.map((doc) {
            final data = doc.data() as Map<String, dynamic>;

            return Card(
              margin: const EdgeInsets.symmetric(vertical: 12),
              elevation: 4,
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Vehicle image
                  ClipRRect(
                    borderRadius: const BorderRadius.vertical(top: Radius.circular(12)),
                    child: Image.network(
                      data['vehicleImageUrl'],
                      width: double.infinity,
                      height: 200,
                      fit: BoxFit.cover,
                      errorBuilder: (context, error, stackTrace) => const SizedBox(
                        height: 200,
                        child: Center(child: Text("Image not available")),
                      ),
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.all(16),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text("🚗 ${data['brand']} ${data['model']} (${data['yom']})", style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
                        const SizedBox(height: 8),
                        Text("Plate: ${data['plate']}"),
                        Text("Fuel: ${data['f_type']} | Transmission: ${data['t_mission']}"),
                        Text("Seats: ${data['seat_capacity']} | Doors: ${data['no_of_doors']}"),
                        Text("Engine: ${data['eng_capacity']}cc | Color: ${data['color']}"),
                        Text("Per Day Charge: Rs. ${data['per_day_chrg']}"),
                        const SizedBox(height: 8),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.end,
                          children: [
                           TextButton.icon(
  onPressed: () {
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (_) => SupplierUpdateVehicleScreen(
          docId: doc.id,
          vehicleData: data,
        ),
      ),
    );
  },
                              icon: const Icon(Icons.edit, color: Colors.blue),
                              label: const Text("Update", style: TextStyle(color: Colors.blue)),
                            ),
                            const SizedBox(width: 10),
                            TextButton.icon(
                              onPressed: () => deleteVehicle(doc.id),
                              icon: const Icon(Icons.delete, color: Colors.red),
                              label: const Text("Delete", style: TextStyle(color: Colors.red)),
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            );
          }).toList(),
        );
      },
    );
  }
}
