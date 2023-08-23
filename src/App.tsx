import { JSPMDemo } from "./JSPMDemo/JSPMDemo";
import { QZTrayDemo } from "./QZTrayDemo/QZTrayDemo";
import { Divider } from "@mui/material";
import { JSOnlyDemo } from "./JSOnlyDemo/JSOnlyDemo";
function App() {
  return (
    <>
      <JSPMDemo />
      <Divider sx={{ mt: 5 }} />
      <QZTrayDemo />
      <Divider sx={{ mt: 5 }} />
      <JSOnlyDemo />
    </>
  );
}

export default App;
