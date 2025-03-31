import 'package:flutter/material.dart';
import 'package:mobile_app/styles.dart'; // Import the styles

class BannerSection extends StatelessWidget {  // Changed the class name to BannerSection
  const BannerSection({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      height: 300, // Adjust the height as needed (similar to 50vh)
      decoration: BoxDecoration(
        image: DecorationImage(
          image: AssetImage('assets/b2.jpg'), // Adjust path to your image
          fit: BoxFit.cover,
          alignment: Alignment.center,
        ),
      ),
      child: Padding(
        padding: const EdgeInsets.all(16.0), // Add padding for better spacing
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Text(
              'Trusted Services',
              style: BannerTextStyles.heading4, // Ensure this is defined in your BannerTextStyles
            ),
            SizedBox(height: 8), // Add some spacing between the texts
            Text(
              'Find your vehicles here!!',
              style: BannerTextStyles.heading2, // Ensure this is defined in your BannerTextStyles
            ),
            SizedBox(height: 20),
            ElevatedButton(
              onPressed: () {
                // Navigate to the loginCustomer route
                Navigator.pushNamed(context, '/loginCustomer');
              },
              style: BannerTextStyles.buttonStyle, // Ensure this is defined in your BannerTextStyles
              child: Text('Explore More'),
            ),
          ],
        ),
      ),
    );
  }
}
