import { Button } from "@mui/material";
import { pureJsZplString } from "../assets/ZPLTest";

export const JSOnlyDemo = () => {
  const printHandler = () => {
    const networkCallData = pureJsZplString;
    const doc = document.getElementById("printf").contentWindow.document;
    doc.open();
    doc.write(networkCallData);
    doc.close();
    window.frames["printf"].focus();
    window.frames["printf"].print();
  };

  return (
    <>
      <h1>Vanilla JS Demo</h1>
      <iframe id="printf" name="printf" style={{ display: "none" }}></iframe>
      <div id="printablediv"></div>
      <div>
        <p>
          Below method does not use any library/application. Manually select the
          ZPL printer in next screen
        </p>
        <Button variant="contained" onClick={printHandler}>
          Vanilla JS
        </Button>
      </div>
    </>
  );
};
