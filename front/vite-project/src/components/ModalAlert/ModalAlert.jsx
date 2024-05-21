import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import CancelIcon from "@mui/icons-material/Cancel";

export default function ModalAlert(prop) {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-100 bg-opacity-50 z-50 md:flex md:justify-end">
      <Alert className="md:mx-auto" severity="warning">
        <div className="flex justify-between">
          <AlertTitle>{prop.msg}</AlertTitle>
          <button onClick={prop.handleAlert}>
            <CancelIcon />
          </button>
        </div>
      </Alert>
    </div>
  );
}
