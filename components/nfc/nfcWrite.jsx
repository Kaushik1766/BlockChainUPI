import React, { useEffect, useState } from "react";
import { View, Text, Button, Alert } from "react-native";
import NfcManager, { NfcTech } from "react-native-nfc-manager";

export default function NFCReader() {
  const [tag, setTag] = useState(null);

  useEffect(() => {
    NfcManager.start();
  }, []);

  async function readNFC() {
    try {
      await NfcManager.requestTechnology(NfcTech.Ndef);
      const tag = await NfcManager.getTag();
      setTag(tag);
      Alert.alert("NFC Tag Detected", JSON.stringify(tag));
    } catch (error) {
      console.warn(error);
    } finally {
      NfcManager.cancelTechnologyRequest();
    }
  }

  return (
    <View>
      <Text>NFC Scanner</Text>
      <Button title="Scan NFC" onPress={readNFC} />
      {tag && <Text>Tag Data: {JSON.stringify(tag)}</Text>}
    </View>
  );
}
