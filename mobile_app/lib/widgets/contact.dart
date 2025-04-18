import 'package:flutter/material.dart';

class ContactPage extends StatelessWidget {
  final _nameController = TextEditingController();
  final _emailController = TextEditingController();
  final _subjectController = TextEditingController();
  final _messageController = TextEditingController();

  ContactPage({super.key});

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      child: Column(
        children: [
          _header(context),
          _contactDetails(),
          _contactForm(),
          _peopleSection(),
        ],
      ),
    );
  }

  Widget _header(BuildContext context) {
    return Stack(
      children: [
        Container(
          width: double.infinity,
          height: 250,
          decoration: const BoxDecoration(
            image: DecorationImage(
              image: AssetImage('assets/banner.png'), // Your header image
              fit: BoxFit.cover,
            ),
          ),
        ),
        Container(
          width: double.infinity,
          height: 250,
          color: Colors.black.withOpacity(0.5),
          child: const Center(
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                Text(
                  "#Let's_talk",
                  style: TextStyle(
                    fontSize: 36,
                    fontWeight: FontWeight.bold,
                    color: Colors.white,
                    letterSpacing: 2,
                  ),
                ),
                SizedBox(height: 10),
                Text(
                  "LEAVE A MESSAGE, We love to hear from you!",
                  style: TextStyle(
                    fontSize: 18,
                    color: Colors.white70,
                    letterSpacing: 1,
                  ),
                ),
              ],
            ),
          ),
        ),
      ],
    );
  }

  Widget _contactDetails() {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 40),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Contact Info
          const Expanded(
            flex: 2,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text("GET IN TOUCH",
                    style:
                        TextStyle(fontSize: 14, fontWeight: FontWeight.w600)),
                SizedBox(height: 10),
                Text(
                  "Explore our Sukkanama website today and discover premium service.",
                  style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold),
                ),
                SizedBox(height: 20),
                Text("Contact Us",
                    style:
                        TextStyle(fontSize: 18, fontWeight: FontWeight.w500)),
                SizedBox(height: 15),
                _ContactItem(
                  icon: Icons.location_on,
                  text: "562 Kithulampitiya Road, Street 31, Galle, Sri Lanka",
                ),
                _ContactItem(
                  icon: Icons.email,
                  text: "sukkanama@gmail.com",
                ),
                _ContactItem(
                  icon: Icons.phone,
                  text: "+94 077 987 8765",
                ),
                _ContactItem(
                  icon: Icons.access_time,
                  text: "We're here for you 24/7",
                ),
              ],
            ),
          ),
          const SizedBox(width: 30),
          // Google Map Placeholder
          Expanded(
            flex: 3,
            child: ClipRRect(
              borderRadius: BorderRadius.circular(8),
              child: AspectRatio(
                aspectRatio: 4 / 3,
                child: Image.network(
                  'https://www.google.com/maps/vt?pb=!1m18!1m12!1m3!1d3967.7065318345794!2d80.21541757576566!3d6.034951493950654!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae173bb01710e51%3A0xad97c91a28f03c9a!2sHemara%20Rich%20Look',
                  fit: BoxFit.cover,
                  errorBuilder: (context, error, stackTrace) {
                    return const Center(child: Text("Google Map Placeholder"));
                  },
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _contactForm() {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 30),
      child: Container(
        decoration: BoxDecoration(
          border: Border.all(color: Colors.grey.shade300),
          borderRadius: BorderRadius.circular(12),
        ),
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text("LEAVE A MESSAGE",
                style: TextStyle(fontSize: 14, fontWeight: FontWeight.w500)),
            const SizedBox(height: 10),
            const Text("We love to hear from you",
                style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold)),
            const SizedBox(height: 20),
            _buildTextField(_nameController, "Your Name"),
            _buildTextField(_emailController, "E-Mail"),
            _buildTextField(_subjectController, "Subject"),
            _buildTextField(_messageController, "Your Message", maxLines: 5),
            const SizedBox(height: 15),
            ElevatedButton(
              onPressed: () {
                // Add your Firebase or backend logic here
              },
              style: ElevatedButton.styleFrom(
                backgroundColor: const Color(0xFF088178),
                padding:
                    const EdgeInsets.symmetric(horizontal: 25, vertical: 12),
              ),
              child: const Text("Submit"),
            ),
          ],
        ),
      ),
    );
  }

  Widget _peopleSection() {
    return const Padding(
      padding: EdgeInsets.all(20),
      child: Column(
        children: [
          _PersonCard(
            name: "Dulaj Ayeshmantha",
            position: "CEO / Founder",
            phone: "+94 788568282",
            email: "dulajayeshmantha91@gmail.com",
            imagePath: "assets/1.png",
          ),
          SizedBox(height: 15),
          _PersonCard(
            name: "Felicia Gunasekara",
            position: "Operations Manager",
            phone: "+94 761825864",
            email: "sandeegunasekera@gmail.com",
            imagePath: "assets/2.png",
          ),
          SizedBox(height: 15),
          _PersonCard(
            name: "Navodya Dewmini",
            position: "Customer Support Manager",
            phone: "+94 753236372",
            email: "dnavodya049@gmail.com",
            imagePath: "assets/3.png",
          ),
          SizedBox(height: 15),
          _PersonCard(
            name: "Saveena Sathsaranee",
            position: "Technical Lead / Developer",
            phone: "+94 764806258",
            email: "saveenaanabel@gmail.com",
            imagePath: "assets/4.png",
          ),
        ],
      ),
    );
  }

  Widget _buildTextField(TextEditingController controller, String hint,
      {int maxLines = 1}) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 15),
      child: TextField(
        controller: controller,
        maxLines: maxLines,
        decoration: InputDecoration(
          hintText: hint,
          contentPadding:
              const EdgeInsets.symmetric(vertical: 12, horizontal: 15),
          border: OutlineInputBorder(borderRadius: BorderRadius.circular(8)),
        ),
      ),
    );
  }
}

class _ContactItem extends StatelessWidget {
  final IconData icon;
  final String text;

  const _ContactItem({required this.icon, required this.text});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 6),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Icon(icon, size: 20, color: Colors.teal),
          const SizedBox(width: 12),
          Expanded(child: Text(text, style: const TextStyle(fontSize: 15))),
        ],
      ),
    );
  }
}

class _PersonCard extends StatelessWidget {
  final String name, position, phone, email, imagePath;

  const _PersonCard({
    required this.name,
    required this.position,
    required this.phone,
    required this.email,
    required this.imagePath,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        border: Border.all(color: Colors.grey.shade300),
        borderRadius: BorderRadius.circular(10),
      ),
      child: Row(
        children: [
          ClipOval(
            child: Image.asset(imagePath,
                width: 65, height: 65, fit: BoxFit.cover),
          ),
          const SizedBox(width: 15),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                /// Name highlighted
                Text(
                  name,
                  style: const TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.bold,
                    color: Colors.teal,
                  ),
                ),
                const SizedBox(height: 4),
                Text(position),
                Text("Phone: $phone"),
                Text("Email: $email"),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
