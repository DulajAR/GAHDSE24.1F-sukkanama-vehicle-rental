import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';

class SupplierUpdateVehicleScreen extends StatefulWidget {
  final String docId;
  final Map<String, dynamic> vehicleData;

  const SupplierUpdateVehicleScreen({
    super.key,
    required this.docId,
    required this.vehicleData,
  });

  @override
  State<SupplierUpdateVehicleScreen> createState() =>
      _SupplierUpdateVehicleScreenState();
}

class _SupplierUpdateVehicleScreenState
    extends State<SupplierUpdateVehicleScreen> {
  final _formKey = GlobalKey<FormState>();

  late TextEditingController _brandController;
  late TextEditingController _modelController;
  late TextEditingController _yomController;
  late TextEditingController _plateController;
  late TextEditingController _fTypeController;
  late TextEditingController _tMissionController;
  late TextEditingController _seatCapacityController;
  late TextEditingController _noOfDoorsController;
  late TextEditingController _engCapacityController;
  late TextEditingController _colorController;
  late TextEditingController _perDayChargeController;

  @override
  void initState() {
    super.initState();
    final v = widget.vehicleData;

    _brandController = TextEditingController(text: v['brand']?.toString());
    _modelController = TextEditingController(text: v['model']?.toString());
    _yomController = TextEditingController(text: v['yom']?.toString());
    _plateController = TextEditingController(text: v['plate']?.toString());
    _fTypeController = TextEditingController(text: v['f_type']?.toString());
    _tMissionController = TextEditingController(text: v['t_mission']?.toString());
    _seatCapacityController = TextEditingController(text: v['seat_capacity']?.toString());
    _noOfDoorsController = TextEditingController(text: v['no_of_doors']?.toString());
    _engCapacityController = TextEditingController(text: v['eng_capacity']?.toString());
    _colorController = TextEditingController(text: v['color']?.toString());
    _perDayChargeController = TextEditingController(text: v['per_day_chrg']?.toString());
  }

  @override
  void dispose() {
    _brandController.dispose();
    _modelController.dispose();
    _yomController.dispose();
    _plateController.dispose();
    _fTypeController.dispose();
    _tMissionController.dispose();
    _seatCapacityController.dispose();
    _noOfDoorsController.dispose();
    _engCapacityController.dispose();
    _colorController.dispose();
    _perDayChargeController.dispose();
    super.dispose();
  }

  Future<void> _updateVehicle() async {
    if (_formKey.currentState!.validate()) {
      try {
        await FirebaseFirestore.instance
            .collection('vehicles')
            .doc(widget.docId)
            .update({
          'brand': _brandController.text.trim(),
          'model': _modelController.text.trim(),
          'yom': _yomController.text.trim(),
          'plate': _plateController.text.trim(),
          'f_type': _fTypeController.text.trim(),
          't_mission': _tMissionController.text.trim(),
          'seat_capacity': _seatCapacityController.text.trim(),
          'no_of_doors': _noOfDoorsController.text.trim(),
          'eng_capacity': _engCapacityController.text.trim(),
          'color': _colorController.text.trim(),
          'per_day_chrg': _perDayChargeController.text.trim(),
        });

        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Vehicle updated successfully!')),
        );

        Navigator.pop(context);
      } catch (e) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Failed to update: $e')),
        );
      }
    }
  }

  Widget _buildTextField(TextEditingController controller, String label) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8),
      child: TextFormField(
        controller: controller,
        decoration: InputDecoration(
          labelText: label,
          border: const OutlineInputBorder(),
        ),
        validator: (value) =>
            value == null || value.isEmpty ? "Required" : null,
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Update Vehicle")),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Form(
          key: _formKey,
          child: Column(
            children: [
              _buildTextField(_brandController, "Brand"),
              _buildTextField(_modelController, "Model"),
              _buildTextField(_yomController, "Year of Manufacture"),
              _buildTextField(_plateController, "Plate Number"),
              _buildTextField(_fTypeController, "Fuel Type"),
              _buildTextField(_tMissionController, "Transmission"),
              _buildTextField(_seatCapacityController, "Seat Capacity"),
              _buildTextField(_noOfDoorsController, "No. of Doors"),
              _buildTextField(_engCapacityController, "Engine Capacity"),
              _buildTextField(_colorController, "Color"),
              _buildTextField(_perDayChargeController, "Per Day Charge"),
              const SizedBox(height: 20),
              ElevatedButton(
                onPressed: _updateVehicle,
                child: const Text("Update Vehicle"),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
