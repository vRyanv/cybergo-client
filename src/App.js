import './App.css';
import {useState} from "react";

const items = [
    {id:1, name:'item 1'},
    {id:2, name:'item 2'},
    {id:3, name:'item 3'}
]

function App() {
    const [checked, setChecked] = useState(null)
    console.log(checked)
  return (
    <div className="App">
        {items.map((item) => (
            <div key={item.id}>
                <input type="radio" name="a" onChange={() => setChecked(item.id)}/> {item.name}
            </div>
        ))}
    </div>
  );
}

export default App;
