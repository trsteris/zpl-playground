import { useEffect, useState } from "react";
import {
  JSPrintManager,
  WSStatus,
  ClientPrintJob,
  InstalledPrinter,
} from "jsprintmanager";
import { jspmZplString } from "../assets/ZPLTest";
import {
  Button,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { EMULATED_ZEBRA_PRINTER_NAME } from "../utils/consts";

export const JSPMDemo = () => {
  const [selectedPrinter, setSelectedPrinter] = useState(
    EMULATED_ZEBRA_PRINTER_NAME
  );
  const [availablePrinters, setAvailablePrinters] = useState<string[]>([]);

  useEffect(() => {
    const startJspmConnection = async () => {
      JSPrintManager.auto_reconnect = true;
      await JSPrintManager.start();
      const printers = (await JSPrintManager.getPrinters()) as string[];

      setAvailablePrinters(printers);
    };

    startJspmConnection();
  }, []);

  const printHandler = async () => {
    if (JSPrintManager.websocket_status == WSStatus.Open) {
      const cpj = new ClientPrintJob();
      cpj.clientPrinter = new InstalledPrinter("Emulated ZPL Printer");

      cpj.printerCommands = jspmZplString;

      cpj.sendToClient();
    }
  };

  return (
    <>
      <h1>JSPM DEMO</h1>
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
