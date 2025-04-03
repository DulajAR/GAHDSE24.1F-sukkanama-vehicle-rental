import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

class Footer extends StatelessWidget {
  const Footer({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(20),
      color: Colors.white,
      child: LayoutBuilder(
        builder: (context, constraints) {
          // Check the width of the screen (for mobile or web view)
          bool isMobileView = constraints.maxWidth < 600;

          return Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Footer Sections - Dynamic Layout based on screen size
              isMobileView
                  ? Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        _footerColumn(
                          title: "Contact",
                          children: [
                            _footerText("Address: 562 Kithulampitiya Road, Galle, Sri Lanka"),
                            _footerText("Phone: +94 078 856 8282 / +94 077 987 8765"),
                            _footerText("Hours: 24 Hours"),
                            const SizedBox(height: 10),
                            _socialIcons(), // Social Media Icons
                          ],
                        ),
                        _footerColumn(
                          title: "About",
                          children: [
                            _footerLink("About Us"),
                            _footerLink("Delivery Information"),
                            _footerLink("Privacy Policy"),
                            _footerLink("Terms & Conditions"),
                            _footerLink("Contact Us"),
                          ],
                        ),
                        _footerColumn(
                          title: "My Account",
                          children: [
                            _footerLink("Sign In"),
                            _footerLink("View Cart"),
                            _footerLink("My Wishlist"),
                            _footerLink("Track My Order"),
                            _footerLink("Help"),
                          ],
                        ),
                        _footerColumn(
                          title: "Install App",
                          children: [
                            _footerText("From App Store or Google Play"),
                            Row(
                              children: [
                                _appImage("assets/app.jpg"),
                                const SizedBox(width: 10),
                                _appImage("assets/play.jpg"),
                              ],
                            ),
                            _footerText("Secured Payment Gateways"),
                            _appImage("assets/pay.png"),
                          ],
                        ),
                      ],
                    )
                  : Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        _footerColumn(
                          title: "Contact",
                          children: [
                            _footerText("Address: 562 Kithulampitiya Road, Galle, Sri Lanka"),
                            _footerText("Phone: +94 078 856 8282 / +94 077 987 8765"),
                            _footerText("Hours: 24 Hours"),
                            const SizedBox(height: 10),
                            _socialIcons(), // Social Media Icons
                          ],
                        ),
                        _footerColumn(
                          title: "About",
                          children: [
                            _footerLink("About Us"),
                            _footerLink("Delivery Information"),
                            _footerLink("Privacy Policy"),
                            _footerLink("Terms & Conditions"),
                            _footerLink("Contact Us"),
                          ],
                        ),
                        _footerColumn(
                          title: "My Account",
                          children: [
                            _footerLink("Sign In"),
                            _footerLink("View Cart"),
                            _footerLink("My Wishlist"),
                            _footerLink("Track My Order"),
                            _footerLink("Help"),
                          ],
                        ),
                        _footerColumn(
                          title: "Install App",
                          children: [
                            _footerText("From App Store or Google Play"),
                            Row(
                              children: [
                                _appImage("assets/app.jpg"),
                                const SizedBox(width: 10),
                                _appImage("assets/play.jpg"),
                              ],
                            ),
                            _footerText("Secured Payment Gateways"),
                            _appImage("assets/pay.png"),
                          ],
                        ),
                      ],
                    ),
              const SizedBox(height: 20),
              Center(
                child: Text(
                  "© 2025, Sukkanama etc - All Rights Reserved.",
                  style: TextStyle(fontSize: 12, color: Colors.black54),
                ),
              ),
            ],
          );
        },
      ),
    );
  }

  // Footer Column Widget
  Widget _footerColumn({required String title, required List<Widget> children}) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(title, style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold)),
        const SizedBox(height: 10),
        ...children,
      ],
    );
  }

  // Footer Text
  Widget _footerText(String text) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 8),
      child: Text(text, style: TextStyle(fontSize: 13, color: Colors.black87)),
    );
  }

  // Footer Links
  Widget _footerLink(String text) {
    return GestureDetector(
      onTap: () {}, // Add navigation function if needed
      child: Padding(
        padding: const EdgeInsets.only(bottom: 8),
        child: Text(
          text,
          style: TextStyle(fontSize: 13, color: Colors.black87),
        ),
      ),
    );
  }

  // Social Media Icons
  Widget _socialIcons() {
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        IconButton(
          icon: FaIcon(FontAwesomeIcons.facebook, color: Color(0xFF465b52), size: 18),
          onPressed: () {}, // Add link
        ),
        IconButton(
          icon: FaIcon(FontAwesomeIcons.twitter, color: Color(0xFF465b52), size: 18),
          onPressed: () {}, // Add link
        ),
        IconButton(
          icon: FaIcon(FontAwesomeIcons.instagram, color: Color(0xFF465b52), size: 18),
          onPressed: () {}, // Add link
        ),
        IconButton(
          icon: FaIcon(FontAwesomeIcons.pinterest, color: Color(0xFF465b52), size: 18),
          onPressed: () {}, // Add link
        ),
        IconButton(
          icon: FaIcon(FontAwesomeIcons.youtube, color: Color(0xFF465b52), size: 18),
          onPressed: () {}, // Add link
        ),
      ],
    );
  }

  // App Store & Payment Images
  Widget _appImage(String path) {
    return Container(
      width: 180,
      height: 40,
      decoration: BoxDecoration(
        border: Border.all(color: Color(0xFF088178)),
        borderRadius: BorderRadius.circular(6),
        image: DecorationImage(image: AssetImage(path), fit: BoxFit.cover),
      ),
    );
  }
}