import 'package:flutter/material.dart';

class AboutContent extends StatelessWidget {
  const AboutContent({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        // Page Banner
        Container(
          width: double.infinity,
          padding: const EdgeInsets.symmetric(vertical: 60),
          decoration: const BoxDecoration(
            image: DecorationImage(
              image: AssetImage("assets/banner.png"),
              fit: BoxFit.cover,
            ),
          ),
          child: const Column(
            children: [
              Text(
                "#KnowUs",
                style: TextStyle(fontSize: 32, color: Colors.white, fontWeight: FontWeight.bold),
              ),
              SizedBox(height: 10),
              Text(
                "Quality Craftsmanship!",
                style: TextStyle(fontSize: 18, color: Colors.white70),
              ),
            ],
          ),
        ),

        // About Section
        Padding(
          padding: const EdgeInsets.all(20.0),
          child: LayoutBuilder(
            builder: (context, constraints) {
              return Column(
                children: [
                  Row(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Expanded(
                        child: ClipRRect(
                          borderRadius: BorderRadius.circular(12),
                          child: Image.asset(
                            "assets/a6.jpg",
                            fit: BoxFit.cover,
                            height: 250,
                          ),
                        ),
                      ),
                      const SizedBox(width: 20),
                      const Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              "Who We Are?",
                              style: TextStyle(fontSize: 26, fontWeight: FontWeight.bold),
                            ),
                            SizedBox(height: 10),
                            Text(
                              "The idea of starting Sukkanama Vehicles arises with a vision of providing travellers with their desired rental vehicles. "
                              "For many traditional car rentals, vehicles offered are usually overpriced or, in some cases, unregulated. "
                              "Sukkanama aims to provide a platform where its members can easily access better, and unique vehicles at more affordable prices.",
                              style: TextStyle(fontSize: 16),
                            ),
                            SizedBox(height: 10),
                            Text(
                              "Sukkanama is also where you can rent out your vehicles when not used. A simple streamlined listing process makes earning passively "
                              "from your vehicles easier than you could imagine! List your vehicles with us and let your vehicles work for you!",
                              style: TextStyle(fontSize: 16, fontStyle: FontStyle.italic),
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                ],
              );
            },
          ),
        ),

        // Scrolling Text
        Container(
          width: double.infinity,
          color: Colors.grey[300],
          padding: const EdgeInsets.symmetric(vertical: 10),
          child: const SingleChildScrollView(
            scrollDirection: Axis.horizontal,
            child: Row(
              children: [
                SizedBox(width: 10),
                Text(
                  "At Sukkanama, we take immense pride in introducing our innovative vehicle renting system, built on a foundation of excellence. "
                  "Our unwavering commitment to providing exceptional service sets us apart in the industry. We invite you to join us and "
                  "discover the remarkable difference our new system makes in your travel journey.",
                  style: TextStyle(fontSize: 16),
                ),
                SizedBox(width: 10),
              ],
            ),
          ),
        ),

        // Download App Section
        const SizedBox(height: 40),
        const Text(
          "Download Our App",
          style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
        ),
        const SizedBox(height: 10),
        TextButton(
          onPressed: () {
            // TODO: Add your app download link
          },
          child: const Text(
            "Click Here",
            style: TextStyle(fontSize: 16, color: Colors.blue),
          ),
        ),
        const SizedBox(height: 40),
      ],
    );
  }
}
