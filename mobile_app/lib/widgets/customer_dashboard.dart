import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:mobile_app/screens/customer_bookings_screen.dart';
import '../screens/all_vehicles_screen.dart'; // Adjust the path as necessary

class CustomerDashboard extends StatefulWidget {
  final String email;

  const CustomerDashboard({super.key, required this.email});

  @override
  State<CustomerDashboard> createState() => _CustomerDashboardState();
}

class _CustomerDashboardState extends State<CustomerDashboard> {
  Map<String, dynamic>? customerData;

  @override
  void initState() {
    super.initState();
    fetchCustomerData();
  }

  Future<void> fetchCustomerData() async {
    try {
      final snapshot = await FirebaseFirestore.instance
          .collection('customers')
          .where('email', isEqualTo: widget.email)
          .limit(1)
          .get();

      if (snapshot.docs.isNotEmpty) {
        setState(() {
          customerData = snapshot.docs.first.data();
        });
      }
    } catch (e) {
      print("Error fetching customer data: $e");
    }
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(24.0),
      color: Colors.grey[100],
      child: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              'Welcome to Your Dashboard!',
              style: AppStyles.heading1,
            ),
            const SizedBox(height: 20),
            if (customerData != null)
              Card(
                elevation: 4,
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                child: Padding(
                  padding: const EdgeInsets.all(16.0),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text("👤 ${customerData!['f_name']} ${customerData!['l_name']}", style: AppStyles.profileText),
                      Text("📧 Email: ${customerData!['email']}", style: AppStyles.profileText),
                      Text("📞 Phone: ${customerData!['tel_no']}", style: AppStyles.profileText),
                      Text("🪪 NIC: ${customerData!['nic']}", style: AppStyles.profileText),
                      Text("🪪 License: ${customerData!['d_licen']}", style: AppStyles.profileText),
                      Text("📅 Registered on: ${customerData!['reg_date']}", style: AppStyles.profileText),
                    ],
                  ),
                ),
              )
            else
              const Center(child: CircularProgressIndicator()),
            const SizedBox(height: 20),
            Wrap(
              spacing: 20,
              runSpacing: 20,
              children: [
                _dashboardCard(
                  context,
                  icon: Icons.search,
                  title: 'Browse Vehicles',
                  onTap: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (context) => AllVehiclesScreen(email: widget.email),
                      ),
                    );
                  },
                ),
             
                _dashboardCard(
                  context,
                  icon: Icons.history,
                  title: 'Booking History',
                  onTap: () {
                   Navigator.push(
                     context,
                     MaterialPageRoute(
                       builder: (context) => CustomerBookingsScreen(email: widget.email),
                       ),
                     );
                   },
                  ),

                
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _dashboardCard(BuildContext context,
      {required IconData icon, required String title, required VoidCallback onTap}) {
    return InkWell(
      onTap: onTap,
      child: Container(
        width: MediaQuery.of(context).size.width < 600 ? double.infinity : 250,
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: Colors.white,
          border: Border.all(color: Colors.grey[300]!),
          borderRadius: BorderRadius.circular(12),
          boxShadow: const [
            BoxShadow(
              color: Colors.black12,
              blurRadius: 6,
              offset: Offset(0, 3),
            ),
          ],
        ),
        child: Column(
          children: [
            Icon(icon, size: 40, color: Colors.blue),
            const SizedBox(height: 10),
            Text(title, style: AppStyles.navText),
          ],
        ),
      ),
    );
  }
}

class AppStyles {
  static const TextStyle navText = TextStyle(
    fontSize: 16,
    color: Colors.black87,
    fontWeight: FontWeight.w500,
  );

  static const TextStyle heading1 = TextStyle(
    fontSize: 28,
    fontWeight: FontWeight.bold,
    color: Colors.black,
  );

  static const TextStyle profileText = TextStyle(
    fontSize: 16,
    color: Colors.black87,
    height: 1.5,
  );
}
