import 'package:flutter/material.dart';

class HeroSection extends StatefulWidget {
  const HeroSection({super.key});

  @override
  State<HeroSection> createState() => _HeroSectionState();
}

class _HeroSectionState extends State<HeroSection> with TickerProviderStateMixin {
  late AnimationController _controller;

  // Control staggered visibility for animations:
  bool _visible1 = false;
  bool _visible2 = false;
  bool _visible3 = false;
  bool _visibleButton = false;

  @override
  void initState() {
    super.initState();

    _controller = AnimationController(
      duration: const Duration(milliseconds: 1800),
      vsync: this,
    );

    // Run staggered animation sequence on init
    _runAnimationSequence();
  }

  Future<void> _runAnimationSequence() async {
    await Future.delayed(const Duration(milliseconds: 300));
    setState(() => _visible1 = true);
    await Future.delayed(const Duration(milliseconds: 300));
    setState(() => _visible2 = true);
    await Future.delayed(const Duration(milliseconds: 300));
    setState(() => _visible3 = true);
    await Future.delayed(const Duration(milliseconds: 300));
    setState(() => _visibleButton = true);

    _controller.forward();
  }

  void browseVehicles(BuildContext context) {
    Navigator.pushNamed(context, '/loginCustomer');
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  // Helper method to animate text fading & sliding in
  Widget animatedText(String text, TextStyle style, bool visible, {TextAlign? textAlign, int? maxLines}) {
    return AnimatedOpacity(
      opacity: visible ? 1 : 0,
      duration: const Duration(milliseconds: 700),
      child: AnimatedSlide(
        offset: visible ? Offset.zero : const Offset(0, 0.3),
        duration: const Duration(milliseconds: 700),
        child: Text(
          text,
          style: style,
          textAlign: textAlign,
          maxLines: maxLines,
          overflow: TextOverflow.visible,
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      height: MediaQuery.of(context).size.height * 0.6,
      decoration: const BoxDecoration(
        image: DecorationImage(
          image: AssetImage('assets/hero4.png'),
          fit: BoxFit.cover,
          colorFilter: ColorFilter.mode(Colors.black45, BlendMode.darken),
        ),
      ),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          animatedText(
            'Sukkanama',
            const TextStyle(
              fontSize: 42,
              fontWeight: FontWeight.w900,
              color: Colors.white,
              letterSpacing: 1.5,
              shadows: [
                Shadow(
                  color: Colors.black87,
                  offset: Offset(2, 2),
                  blurRadius: 6,
                ),
              ],
            ),
            _visible1,
          ),
          const SizedBox(height: 14),
          animatedText(
            'Drive Your Dream, Today',
            const TextStyle(
              fontSize: 24,
              fontWeight: FontWeight.w600,
              color: Colors.white,
              letterSpacing: 0.5,
              shadows: [
                Shadow(
                  color: Colors.black54,
                  offset: Offset(1, 1),
                  blurRadius: 4,
                ),
              ],
            ),
            _visible2,
          ),
          const SizedBox(height: 16),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 40.0),
            child: animatedText(
              'Fast, flexible, and affordable rentals at your fingertips',
              const TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.w500,
                color: Colors.white,
                height: 1.6,
                letterSpacing: 0.3,
                shadows: [
                  Shadow(
                    color: Colors.black45,
                    offset: Offset(1, 1),
                    blurRadius: 3,
                  ),
                ],
              ),
              _visible3,
              textAlign: TextAlign.center,
              maxLines: 3,
            ),
          ),
          const SizedBox(height: 32),
          AnimatedOpacity(
            opacity: _visibleButton ? 1 : 0,
            duration: const Duration(milliseconds: 700),
            child: AnimatedSlide(
              offset: _visibleButton ? Offset.zero : const Offset(0, 0.3),
              duration: const Duration(milliseconds: 700),
              child: ElevatedButton(
                onPressed: () => browseVehicles(context),
                style: ElevatedButton.styleFrom(
                  backgroundColor: const Color(0xFFf9b233),
                  padding: const EdgeInsets.symmetric(horizontal: 40, vertical: 16),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(32),
                  ),
                  elevation: 10,
                  shadowColor: const Color(0xFFe89c1b),
                ),
                child: const Text(
                  'Get Started',
                  style: TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                    letterSpacing: 1,
                    color: Colors.black,
                  ),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
