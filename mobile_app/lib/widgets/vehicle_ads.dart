import 'package:flutter/material.dart';

class VehicleAds extends StatelessWidget {
  const VehicleAds({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            'Vehicle Ads',
            style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 10),
          // Placeholder for future vehicle data
          Container(
            height: 200,
            color: Colors.grey[300], // Placeholder box
            child: const Center(child: Text('Vehicle Ads Display Here')),
          ),
        ],
      ),
    );
  }
}
