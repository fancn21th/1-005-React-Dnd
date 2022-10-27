import EditFieldsView from "./components/EditFieldsView";
import Providers from "./components/Providers";
import DragLayer from "./components/DragLayer";
import "./App.css";

function App() {
  return (
    <Providers>
      <DragLayer />
      <EditFieldsView></EditFieldsView>
    </Providers>
  );
}

export default App;
