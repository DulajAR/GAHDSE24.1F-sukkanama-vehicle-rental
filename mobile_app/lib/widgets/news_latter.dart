import 'package:flutter/material.dart';

class NewsLetter extends StatelessWidget {
  const NewsLetter({super.key});

  @override
  Widget build(BuildContext context) {
    // Get screen width
    final double screenWidth = MediaQuery.of(context).size.width;

    return Container(
      width: screenWidth, // Make it full width
      padding: const EdgeInsets.symmetric(vertical: 20, horizontal: 16),
      decoration: const BoxDecoration(
        color: Color(0xFF036ffc), // Background color
        image: DecorationImage(
          image: AssetImage("assets/b14.png"), // Background image
          fit: BoxFit.cover,
          alignment: Alignment(0.2, 0.3), // Matches background-position: 20% 30%;
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          // Title and Subtitle
          const Text(
            "Sign Up For Newsletters",
            style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold, color: Colors.white),
          ),
          const SizedBox(height: 8),
          const Text(
            "Get E-mail updates about our latest functions and special offers.",
            textAlign: TextAlign.center,
            style: TextStyle(fontSize: 14, fontWeight: FontWeight.w600, color: Color(0xFF01080d)),
          ),
          const SizedBox(height: 16),

          // Email Input Field & Button
          Container(
            width: screenWidth < 600 ? screenWidth * 0.9 : 400, // Full width on small screens, fixed width on larger
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(4),
              boxShadow: [
                BoxShadow(
                  color: Colors.black.withOpacity(0.1),
                  blurRadius: 8,
                  offset: const Offset(0, 4),
                ),
              ],
            ),
            child: Row(
              children: [
                // Email Input Field
                const Expanded(
                  child: TextField(
                    decoration: InputDecoration(
                      hintText: "Your email address",
                      hintStyle: TextStyle(fontSize: 14),
                      contentPadding: EdgeInsets.symmetric(horizontal: 16),
                      border: InputBorder.none,
                    ),
                  ),
                ),
                
                // Sign-Up Button
                ElevatedButton(
                  onPressed: () {
                    // Add Firebase email subscription function here
                  },
                  style: ElevatedButton.styleFrom(
                    backgroundColor: const Color(0xFF088178), // Button color
                    foregroundColor: Colors.white, // Text color
                    shape: const RoundedRectangleBorder(
                      borderRadius: BorderRadius.only(
                        topRight: Radius.circular(4),
                        bottomRight: Radius.circular(4),
                      ),
                    ),
                  ),
                  child: const Padding(
                    padding: EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                    child: Text("Sign Up"),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}