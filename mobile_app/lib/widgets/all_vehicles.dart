import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';

class AllVehicles extends StatefulWidget {
  final String? brandFilter;
  final String? yearFilter;

  const AllVehicles({super.key, this.brandFilter, this.yearFilter});

  @override
  State<AllVehicles> createState() => _AllVehiclesState();
}

class _AllVehiclesState extends State<AllVehicles> {
  Future<QuerySnapshot> getFilteredVehicles() {
    Query query = FirebaseFirestore.instance.collection('vehicles');

    if (widget.brandFilter != null && widget.brandFilter!.isNotEmpty) {
      query = query.where('brand', isEqualTo: widget.brandFilter);
    }

    if (widget.yearFilter != null && widget.yearFilter!.isNotEmpty) {
      query = query.where('yom', isEqualTo: widget.yearFilter);
    }

    return query.get();
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<QuerySnapshot>(
      future: getFilteredVehicles(),
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return const Center(child: CircularProgressIndicator());
        }

        if (!snapshot.hasData || snapshot.data!.docs.isEmpty) {
          return const Center(child: Text("No vehicles found."));
        }

        final vehicles = snapshot.data!.docs;

        return ListView.builder(
          shrinkWrap: true,
          physics: const NeverScrollableScrollPhysics(),
          itemCount: vehicles.length,
          itemBuilder: (context, index) {
            final vehicleData = vehicles[index].data() as Map<String, dynamic>;

            return Card(
              elevation: 4,
              margin: const EdgeInsets.symmetric(vertical: 8, horizontal: 16),
              shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(10)),
              child: Padding(
                padding: const EdgeInsets.all(16),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    if (vehicleData['vehicleImageUrl'] != null)
                      ClipRRect(
                        borderRadius: BorderRadius.circular(10),
                        child: Image.network(
                          vehicleData['vehicleImageUrl'],
                          height: 200,
                          width: double.infinity,
                          fit: BoxFit.cover,
                        ),
                      ),
                    const SizedBox(height: 10),
                    Text(
                      "${vehicleData['brand']} ${vehicleData['model']} (${vehicleData['yom']})",
                      style: const TextStyle(
                          fontSize: 18, fontWeight: FontWeight.bold),
                    ),
                    const SizedBox(height: 5),
                    Text("Plate: ${vehicleData['plate']}"),
                    Text("Color: ${vehicleData['color']}"),
                    Text("Seat Capacity: ${vehicleData['seat_capacity']}"),
                    Text("No. of Doors: ${vehicleData['no_of_doors']}"),
                    Text("Transmission: ${vehicleData['t_mission']}"),
                    Text("Fuel Type: ${vehicleData['f_type']}"),
                    Text("Engine Capacity: ${vehicleData['eng_capacity']} cc"),
                    Text("Per Day Charge: Rs. ${vehicleData['per_day_chrg']}"),
                    const SizedBox(height: 8),
                    Text(vehicleData['description'] ?? ""),
                    const SizedBox(height: 12),
                    Align(
                      alignment: Alignment.centerRight,
                      child: ElevatedButton(
                        onPressed: () {
                          // TODO: Navigate to booking screen
                        },
                        child: const Text("Book Now"),
                      ),
                    )
                  ],
                ),
              ),
            );
          },
        );
      },
    );
  }
}
