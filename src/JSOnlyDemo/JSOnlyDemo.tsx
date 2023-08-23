import { Button } from "@mui/material";
import { pureJsZplString } from "../assets/ZPLTest";

export const JSOnlyDemo = () => {
  const printHandler = () => {
    const doc = document.getElementById("printFrame").contentWindow.document;
    doc.open();
    doc.write(pureJsZplString);
    doc.close();
    window.frames["printFrame"].print();
  };

  return (
    <>
      <h1>Vanilla JS Demo</h1>
      <iframe
        id="printFrame"
        name="printFrame"
        style={{ display: "none" }}
      ></iframe>
      <div>
        <Button variant="contained" onClick={printHandler}>
          Vanilla JS
        </Button>
      </div>
    </>
  );
};
