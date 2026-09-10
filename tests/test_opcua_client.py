import unittest
import json

class TestIIoTTelemetry(unittest.TestCase):
    def test_telemetry_schema(self):
        payload = {
            "machine_id": "CNC_MILL_04",
            "spindle_speed_rpm": 12000,
            "vibration_rms_g": 0.042,
            "bearing_temp_c": 48.5
        }
        serialized = json.dumps(payload)
        parsed = json.loads(serialized)
        self.assertEqual(parsed["machine_id"], "CNC_MILL_04")
        self.assertLess(parsed["vibration_rms_g"], 0.1)

if __name__ == '__main__':
    unittest.main()
