import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:mobile_app/screens/customer_login_screen.dart'; // Update the path if it's different

class VehicleAds extends StatefulWidget {
  const VehicleAds({super.key});

  @override
  State<VehicleAds> createState() => _VehicleAdsState();
}

class _VehicleAdsState extends State<VehicleAds> {
  String? selectedBrand = "All";
  String? selectedYear = "All";

  final List<String> brandList = [
    "All", "Audi", "BMW", "Daihatsu", "Dimo", "Ford", "Honda", "Hyundai", "Isuzu", "Jeep", "KIA", "Mazda",
    "Benze", "Mitsubishi", "Nissan", "Perodua", "Suzuki", "Toyota", "Micro"
  ];

  List<String> generateYearOptions() {
    int currentYear = DateTime.now().year;
    List<String> years = List.generate(30, (index) => (currentYear - index).toString());
    years.insert(0, "All");
    return years;
  }

  Stream<QuerySnapshot> getFilteredVehicles() {
    CollectionReference vehicles = FirebaseFirestore.instance.collection('vehicles');
    Query query = vehicles;

    if (selectedBrand != null && selectedBrand != "All") {
      query = query.where('brand', isEqualTo: selectedBrand);
    }

    if (selectedYear != null && selectedYear != "All") {
      query = query.where('yom', isEqualTo: selectedYear);
    }

    return query.snapshots();
  }

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(16.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          const Text('Vehicle Ads', style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold)),
          const SizedBox(height: 10),

          // Brand Dropdown
          DropdownButtonFormField<String>(
            decoration: const InputDecoration(labelText: 'Select Brand'),
            value: selectedBrand,
            items: brandList
                .map((brand) => DropdownMenuItem(value: brand, child: Text(brand)))
                .toList(),
            onChanged: (value) {
              setState(() => selectedBrand = value);
            },
          ),

          const SizedBox(height: 10),

          // Year Dropdown
          DropdownButtonFormField<String>(
            decoration: const InputDecoration(labelText: 'Select Year of Manufacture'),
            value: selectedYear,
            items: generateYearOptions()
                .map((year) => DropdownMenuItem(value: year, child: Text(year)))
                .toList(),
            onChanged: (value) {
              setState(() => selectedYear = value);
            },
          ),

          const SizedBox(height: 20),

          // Vehicle List
          SizedBox(
            height: 330,
            child: StreamBuilder<QuerySnapshot>(
              stream: getFilteredVehicles(),
              builder: (context, snapshot) {
                if (snapshot.connectionState == ConnectionState.waiting) {
                  return const Center(child: CircularProgressIndicator());
                }

                if (snapshot.hasError) {
                  return Center(child: Text('Error: ${snapshot.error}'));
                }

                if (!snapshot.hasData || snapshot.data!.docs.isEmpty) {
                  return const Center(child: Text('No vehicles found'));
                }

                final vehicles = snapshot.data!.docs;

                return ListView.builder(
                  scrollDirection: Axis.horizontal,
                  itemCount: vehicles.length,
                  itemBuilder: (context, index) {
                    final vehicle = vehicles[index].data() as Map<String, dynamic>;

                    return Container(
                      width: MediaQuery.of(context).size.width * 0.8,
                      margin: const EdgeInsets.only(right: 12.0),
                      padding: const EdgeInsets.all(16.0),
                      decoration: BoxDecoration(
                        color: Colors.white,
                        borderRadius: BorderRadius.circular(12),
                        boxShadow: [
                          BoxShadow(
                            color: Colors.black.withOpacity(0.1),
                            blurRadius: 6,
                            offset: const Offset(0, 3),
                          ),
                        ],
                      ),
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        crossAxisAlignment: CrossAxisAlignment.center,
                        children: [
                          Column(
                            children: [
                              Text(
                                '${vehicle['brand'] ?? 'Unknown'} ${vehicle['model'] ?? ''}',
                                style: const TextStyle(
                                  fontSize: 20,
                                  fontWeight: FontWeight.bold,
                                ),
                                textAlign: TextAlign.center,
                              ),
                              const SizedBox(height: 8),
                              Text('Plate: ${vehicle['plate'] ?? 'N/A'}'),
                              Text('Color: ${vehicle['color'] ?? 'N/A'}'),
                              Text('Fuel Type: ${vehicle['f_type'] ?? 'N/A'}'),
                              Text('Seats: ${vehicle['seat_capacity'] ?? 'N/A'}'),
                              Text('Charge per Day: Rs. ${vehicle['per_day_chrg'] ?? 'N/A'}'),
                              Text('Year: ${vehicle['yom'] ?? 'N/A'}'),
                            ],
                          ),
                          const SizedBox(height: 10),
                          ElevatedButton(
                            onPressed: () {
                              Navigator.push(
                                context,
                                MaterialPageRoute(
                                  builder: (context) => const CustomerLoginScreen(),
                                ),
                              );
                            },
                            style: ElevatedButton.styleFrom(
                              backgroundColor: Colors.blue,
                              padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
                              shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(8),
                              ),
                            ),
                            child: const Text('Book Now', style: TextStyle(color: Colors.white)),
                          ),
                        ],
                      ),
                    );
                  },
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}
