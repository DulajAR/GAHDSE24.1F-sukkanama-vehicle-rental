import 'package:flutter/material.dart';
import 'package:mobile_app/widgets/all_vehicles.dart';

class AllVehiclesScreen extends StatefulWidget {
  final String email;

  const AllVehiclesScreen({super.key, required this.email});

  @override
  State<AllVehiclesScreen> createState() => _AllVehiclesScreenState();
}

class _AllVehiclesScreenState extends State<AllVehiclesScreen> {
  final List<String> brandOptions = [
    "All", "Audi", "BMW", "Daihatsu", "Dimo", "Ford", "Honda", "Hyundai",
    "Isuzu", "Jeep", "KIA", "Mazda", "Benze", "Mitsubishi", "Nissan",
    "Perodua", "Suzuki", "Toyota", "Micro"
  ];

  List<String> yearOptions = [];

  String selectedBrand = "All";
  String selectedYear = "All";

  @override
  void initState() {
    super.initState();
    int currentYear = DateTime.now().year;
    yearOptions = ["All"];
    for (int year = 1980; year <= currentYear; year++) {
      yearOptions.add(year.toString());
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("All Vehicles")),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            Text(
              "Displaying all vehicles for: ${widget.email}",
              style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 16),

            /// Dropdown for Brand
            DropdownButtonFormField<String>(
              decoration: const InputDecoration(
                labelText: "Filter by Brand",
                border: OutlineInputBorder(),
              ),
              value: selectedBrand,
              items: brandOptions.map((brand) {
                return DropdownMenuItem(
                  value: brand,
                  child: Text(brand),
                );
              }).toList(),
              onChanged: (value) {
                setState(() {
                  selectedBrand = value!;
                });
              },
            ),
            const SizedBox(height: 12),

            /// Dropdown for Year
            DropdownButtonFormField<String>(
              decoration: const InputDecoration(
                labelText: "Filter by Year",
                border: OutlineInputBorder(),
              ),
              value: selectedYear,
              items: yearOptions.map((year) {
                return DropdownMenuItem(
                  value: year,
                  child: Text(year),
                );
              }).toList(),
              onChanged: (value) {
                setState(() {
                  selectedYear = value!;
                });
              },
            ),
            const SizedBox(height: 16),

            /// Vehicle List
            AllVehicles(
              brandFilter: selectedBrand != "All" ? selectedBrand : null,
              yearFilter: selectedYear != "All" ? selectedYear : null,
            ),
          ],
        ),
      ),
    );
  }
}
