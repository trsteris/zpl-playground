// @ts-ignore
import qz from "qz-tray";
import { useEffect, useState } from "react";
import { EMULATED_ZEBRA_PRINTER_NAME } from "../utils/consts";
import { qztrayZplString } from "../assets/ZPLTest";
import {
  Button,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

export const QZTrayDemo = () => {
  const [selectedPrinter, setSelectedPrinter] = useState(
    EMULATED_ZEBRA_PRINTER_NAME
  );
  const [availablePrinters, setAvailablePrinters] = useState<string[]>([]);

  useEffect(() => {
    const qzConnect = async () => {
      await qz.websocket.connect();
      const printers = await qz.printers.find();
      console.log(printers);
      setAvailablePrinters(printers);
    };

    qzConnect();
  }, []);

  const printHandler = async () => {
    const printer = await qz.printers.find(selectedPrinter);
    const config = qz.configs.create(printer);
    qz.print(config, [{ type: "raw", format: "plain", data: qztrayZplString }]);
  };

  return (
    <>
      <h1>QZTray Demo</h1>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <FormControl>
          <InputLabel id="printer-select">Select Printer</InputLabel>
          <Select
            label="Select Printer"
            labelId="printer-select"
            value={selectedPrinter}
            onChange={(e) => setSelectedPrinter(e.target.value)}
          >
            {availablePrinters.map((printer) => (
              <MenuItem key={printer} value={printer}>
                {printer}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button variant="contained" onClick={printHandler}>
          Send demo content to label printer
        </Button>
      </Box>
    </>
  );
};
