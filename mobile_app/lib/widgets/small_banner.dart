import 'package:flutter/material.dart';

class SmallBanner extends StatelessWidget {
  const SmallBanner({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        // First Banner Section
        Padding(
          padding: const EdgeInsets.all(16.0),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              _buildBannerBox(
                title: "Rent Vehicle Owners",
                subtitle: "Publish Your Ad",
                description: "Find Customers in Easy Steps",
                buttonText: "Sign Up",
                onPressed: () {
                  Navigator.pushNamed(context, '/loginSupplier');
                },
                imagePath: "assets/b17.png", // ✅ Added background image
              ),
              const SizedBox(width: 10),
              _buildBannerBox(
                title: "Vehicle Finders for Rent",
                subtitle: "Select & Book Your Vehicle",
                description: "Find Your Vehicle in Easy Steps",
                buttonText: "Sign Up",
                onPressed: () {
                  Navigator.pushNamed(context, '/loginCustomer');
                },
                imagePath: "assets/b10.jpg", // ✅ Added background image
              ),
            ],
          ),
        ),

        // Second Banner Section
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 16.0),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              _buildSimpleBannerBox(
                title: "GPS Support",
                subtitle: "Secure Tracking Systems",
              ),
              const SizedBox(width: 10),
              _buildSimpleBannerBox(
                title: "For Special Occasions",
                subtitle: "Many Vehicle Range to Select",
              ),
              const SizedBox(width: 10),
              _buildSimpleBannerBox(
                title: "All Around The Country",
                subtitle: "Island Wide",
              ),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildBannerBox({
    required String title,
    required String subtitle,
    required String description,
    required String buttonText,
    required VoidCallback onPressed,
    String? imagePath, // ✅ New optional background image
  }) {
    return Expanded(
      child: Container(
        padding: const EdgeInsets.all(16.0),
        decoration: BoxDecoration(
          image: imagePath != null
              ? DecorationImage(
                  image: AssetImage(imagePath),
                  fit: BoxFit.cover, // ✅ Covers the container
                )
              : null,
          color: Colors.blueGrey[100], // ✅ Fallback color
          borderRadius: BorderRadius.circular(10),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Text(title, style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Colors.white)),
            const SizedBox(height: 5),
            Text(subtitle, style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w600, color: Colors.white)),
            const SizedBox(height: 5),
            Text(description, textAlign: TextAlign.center, style: const TextStyle(fontSize: 14, color: Colors.white)),
            const SizedBox(height: 10),
            ElevatedButton(
              onPressed: onPressed,
              child: Text(buttonText),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildSimpleBannerBox({required String title, required String subtitle}) {
    return Expanded(
      child: Container(
        padding: const EdgeInsets.all(16.0),
        decoration: BoxDecoration(
          color: Colors.teal[200],
          borderRadius: BorderRadius.circular(10),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Text(title, style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
            const SizedBox(height: 5),
            Text(subtitle, textAlign: TextAlign.center, style: const TextStyle(fontSize: 14)),
          ],
        ),
      ),
    );
  }
}
