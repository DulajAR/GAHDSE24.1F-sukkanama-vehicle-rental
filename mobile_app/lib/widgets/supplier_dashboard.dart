import 'package:flutter/material.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:cloud_firestore/cloud_firestore.dart';

class SupplierDashboard extends StatefulWidget {
  final String email; // ✅ Accept email from login screen

  const SupplierDashboard({super.key, required this.email});

  @override
  State<SupplierDashboard> createState() => _SupplierDashboardState();
}

class _SupplierDashboardState extends State<SupplierDashboard> {
  Map<String, dynamic>? supplierData;

  @override
  void initState() {
    super.initState();
    fetchSupplierData();
  }

  Future<void> fetchSupplierData() async {
    try {
      final snapshot = await FirebaseFirestore.instance
          .collection('suppliers')
          .where('email', isEqualTo: widget.email)
          .limit(1)
          .get();

      if (snapshot.docs.isNotEmpty) {
        setState(() {
          supplierData = snapshot.docs.first.data();
        });
      }
    } catch (e) {
      print("Error fetching supplier data: $e");
    }
  }
@override
Widget build(BuildContext context) {
  return SafeArea(
    child: Padding(
      padding: const EdgeInsets.all(24.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            'Welcome to Your Dashboard!',
            style: AppStyles.heading1,
          ),
          const SizedBox(height: 20),
          if (supplierData != null)
            Card(
              elevation: 4,
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
              child: Padding(
                padding: const EdgeInsets.all(16.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text("👤 ${supplierData!['f_name']} ${supplierData!['l_name']}", style: AppStyles.profileText),
                    Text("📧 Email: ${supplierData!['email']}", style: AppStyles.profileText),
                    Text("📞 Phone: ${supplierData!['tel_no']}", style: AppStyles.profileText),
                    Text("🪪 NIC: ${supplierData!['nic']}", style: AppStyles.profileText),
                    Text("🧾 Tax ID: ${supplierData!['tax_id']}", style: AppStyles.profileText),
                    Text("📅 Registered on: ${supplierData!['reg_date']}", style: AppStyles.profileText),
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
                icon: Icons.add_circle_outline,
                title: 'Add New Vehicle',
                onTap: () {},
              ),
              _dashboardCard(
                context,
                icon: Icons.list_alt,
                title: 'Manage Listings',
                onTap: () {},
              ),
              _dashboardCard(
                context,
                icon: Icons.book_online,
                title: 'View Bookings',
                onTap: () {},
              ),
              _dashboardCard(
                context,
                icon: Icons.settings,
                title: 'Settings',
                onTap: () {},
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
