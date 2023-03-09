import { useState } from 'react';

let defaultRows = '<option value="">select</option><option value="constant">constant</option><option value="argument">argument</option><option value="and">and</option><option value="or">or</option>';
let constantRow = '<option value="false">false</option><option value="true">true</option>'

export default function MyApp() {
  return (
    <div>
      <h1>Logic Maker</h1>
      <ComplexButtons></ComplexButtons>
    </div>
  );
}

function ComplexButtons() {
  const [resultTxt, setResultTxt] = useState('');
  const [result, setResult] = useState('');
  const [count,setCount] = useState(1);
  const [textID,setTextID] = useState('');
  const [dropID,setDropID] = useState('');
  const [answerSel,setAnswerSel] = useState('');
   
  function incrementCount() {
    setCount((prevCounter) => prevCounter + 1);
  }
  return (
    <div>
      {[...Array(count)].map((e, i) => 
      <MyButton key={i} id={i} 
                onTextIDChange={setTextID} 
                onDropIDChange={setDropID} 
                onFilterTextChange={setResultTxt} 
                onDropDownChange={setResult}></MyButton>)}
      <button onClick={incrementCount}>+ add arg</button><br/>  
    <RecursiveSelect count={count} onOptionsChange={setAnswerSel} depth={0}
    ></RecursiveSelect>
    <div>
      <label>ID : {textID} Text Box : {resultTxt}</label><br/>
      <label>ID : {dropID} Drop Down : {result}</label><br/>
      <label>Drop Down : {answerSel}</label>
      {/* for or condition if both are false then only false else answer will  be true */}
      {/* if result is true than show true if resut is false then show false ---for and */}
    </div>
    </div>
  );
}

function DynamicSelect({count, onOptionsChange}) {
  const [rows, setRows] = useState(defaultRows);
  const [subDropCount, setSubDropCount] = useState(2);
  const [subSelectVisible,SetSubSelectVisible] = useState(false);

  function changeOptions(e){
    console.log(" changeOptions - e "+e);
    if(e === "") {
      SetSubSelectVisible(false)
      setRows(defaultRows);
    }
    if(e === "constant") {
      SetSubSelectVisible(false);
      setRows(constantRow);
    }
    if(e === "argument") {
      SetSubSelectVisible(false)
      let rower = '';
       for (let id = 0; id < count; id++) {
          let var1 = document.getElementById("textid_"+id).value;
          let var2 = document.getElementById("dropid_"+id).value;
          rower= rower +'<option value='+var2+'>'+var1+'</option>';
       }
      setRows(rower);
    }
    if(e === "and"){
      SetSubSelectVisible(true)
    }
    if(e === "or"){        
        SetSubSelectVisible(true)    
    }
    onOptionsChange(e);
  }

  function resetOption() {
    SetSubSelectVisible(false)
    setRows(defaultRows);
  }
  function addOptions() {
    setSubDropCount((prevCounter) => prevCounter + 1);
}
  return (
    <div>
    <select id="masterSelect" dangerouslySetInnerHTML= {{__html: rows}} onChange={(e) =>  changeOptions(e.target.value)}>
    </select>
    <button onClick={resetOption}>x</button><br/>
    {subSelectVisible && 
      <div>
        {[...Array(subDropCount)].map((e, i) => 
      <DynamicSubSelect key={i} count={count}                       
      onOptionsChange={onOptionsChange}></DynamicSubSelect>)}    
      &ensp;&ensp;<button onClick={addOptions}>add Op</button><br/>
      </div>
    }  
  </div>       
  );
} 
function TabSpace({depth}){
  return (
    <span>{[...Array(depth)].map((e, i) => 
      <span>&ensp;&ensp;</span>)}
    </span>
  );
}
function RecursiveSelect({count, onOptionsChange, depth}) {
  const [rows, setRows] = useState(defaultRows);
  const [selectedVal, setSelectedVal] = useState('');
  const [subDropCount, setSubDropCount] = useState(2);
  const [subSelectVisible,SetSubSelectVisible] = useState(false);

  function changeOptions(e){    
    setSelectedVal(e);
    if(e === "") {
      SetSubSelectVisible(false)
      setRows(defaultRows);
    }
    if(e === "constant") {
      SetSubSelectVisible(false);
      setRows(constantRow);
    }
    if(e === "argument") {
      SetSubSelectVisible(false)
      let rower = '';
       for (let id = 0; id < count; id++) {
          let var1 = document.getElementById("textid_"+id).value;
          let var2 = document.getElementById("dropid_"+id).value;
          rower= rower +'<option value='+var2+'>'+var1+'</option>';
       }
      setRows(rower);
    }
    if(e === "and"){
      SetSubSelectVisible(true)
    }
    if(e === "or"){        
        SetSubSelectVisible(true)      
    }
    onOptionsChange(e);
  }

  function resetOption(){
    SetSubSelectVisible(false);
    setRows(defaultRows);
    setSelectedVal("");
  }
  function addOptions(){
    setSubDropCount((prevCounter) => prevCounter + 1);
}
  return (
    <div>
    <TabSpace key={"select_"+depth} depth={depth}></TabSpace>
    <select value={selectedVal} dangerouslySetInnerHTML= {{__html: rows}} onChange={(e) =>  changeOptions(e.target.value)}>
    </select>
    <button onClick={resetOption}>x</button><br/>
    {subSelectVisible && 
      <div>
        {[...Array(subDropCount)].map((e, i) => 
      <RecursiveSelect key={i} count={count}                       
      onOptionsChange={onOptionsChange} depth={depth+1}></RecursiveSelect>)} 
      <TabSpace key={"button_"+depth} depth={depth+1}></TabSpace><button onClick={addOptions}>add Op</button><br/>
      </div>
    } 
  </div>       
  );
} 

function DynamicSubSelect({count, onOptionsChange}) {
  const [rows, setRows] = useState(defaultRows);
  function changeOptions(e){
    onOptionsChange(e);
    if(e === "") {
      setRows(defaultRows);
    }
    if(e === "constant") {
      setRows(constantRow);
    }
    if(e === "argument") {
      let rower = '';
       for (let id = 0; id < count; id++) {
          let var1 = document.getElementById("textid_"+id).value;
          let var2 = document.getElementById("dropid_"+id).value;
          rower= rower +'<option value='+var2+'>'+var1+'</option>';
       }
      setRows(rower);
    }
  }
  function resetOption(){
      setRows(defaultRows);
  }
  return (
    <div >
    &ensp;&ensp;<select dangerouslySetInnerHTML= {{__html: rows}} onChange={(e) =>  changeOptions(e.target.value)}>
    </select><button onClick={resetOption}>x</button><br/>    
  </div>      
  );
} 

function MyButton({id, onTextIDChange, onDropIDChange, onFilterTextChange, onDropDownChange}) {
return (
    <div>
      {id}{" "}
      <input id={"textid_"+id} onChange={(e) => {onFilterTextChange(e.target.value); onTextIDChange(e.target.id);}} >
      </input>
      <select id={"dropid_"+id} onChange={(e) => {onDropDownChange(e.target.value); onDropIDChange(e.target.id);}}>
        <option value="true">true</option>
        <option value="false">false</option>
      </select>
    </div>  
  );
} 