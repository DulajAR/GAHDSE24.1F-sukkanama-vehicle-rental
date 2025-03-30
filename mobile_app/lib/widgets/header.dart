import 'package:flutter/material.dart';
import 'package:mobile_app/styles.dart';

class Header extends StatefulWidget {
  const Header({super.key});

  @override
  _HeaderState createState() => _HeaderState();
}

class _HeaderState extends State<Header> {
  bool isMobileMenuOpen = false;

  void toggleMobileMenu() {
    setState(() {
      isMobileMenuOpen = !isMobileMenuOpen;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
      decoration: AppStyles.headerDecoration,
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          // Logo
          Image.asset('assets/logo.png', height: 50)
,

          // Navigation Menu
          if (MediaQuery.of(context).size.width > 768)
            Row(
              children: [
                _navItem('Home', () {}),
                _navItem('Rent Your Vehicle', () {}),
                _navItem('Find Your Vehicle', () {}),
                _navItem('About', () {}),
                _navItem('Contact', () {}),
              ],
            ),

          // Mobile Menu Button
          if (MediaQuery.of(context).size.width <= 768)
            IconButton(
              icon: const Icon(Icons.menu),
              onPressed: toggleMobileMenu,
            ),
        ],
      ),
    );
  }

  Widget _navItem(String title, VoidCallback onTap) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 10),
      child: InkWell(
        onTap: onTap,
        child: Text(title, style: AppStyles.navText),
      ),
    );
  }
}
