import 'package:flutter/material.dart';

final ThemeData appTheme = ThemeData(
  primaryColor: Colors.teal,
  scaffoldBackgroundColor: Colors.grey[200],
  appBarTheme: const AppBarTheme(
    backgroundColor: Colors.white,
    elevation: 2,
    iconTheme: IconThemeData(color: Colors.black),
  ),
  textTheme: const TextTheme(
    bodyMedium: TextStyle(color: Colors.black),
  ),
);
