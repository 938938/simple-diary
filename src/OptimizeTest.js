import React,{ useState,useEffect } from "react";

// const TextView = React.memo(({text}) =>{ // React.memo 기능 추가. text가 변동될 때에만 렌더링이 발생 
//   useEffect(()=>{
//     console.log(`update :: text : ${text}`);
//   });
//   return <div>{text}</div>
// });
// const CountView = ({count})=>{
//   useEffect(()=>{
//     console.log(`update :: count : ${count}`);
//   })
//   return <div>{count}</div>
// }

const OptimizeTest = () =>{
  // const [count,setCount] = useState(1);
  // const [text,setText] = useState("");

  const [count,setCount] = useState(1);
  const [obj,setObj] = useState({
    count : 1
  });
  const CounterA = React.memo(({count}) =>{
    // 상태변화를 줘도 상태가 1 그대로로 바뀌지 않으므로 리렌더링이 일어나지 않음
    useEffect(()=>{
      console.log(`Counter A update = ${count}`);
    })
    return <div>{count}</div>
  });
  const CounterB = ({obj}) =>{
    // React.memo 기능을 적용했을 경우
    // obj는 객체, 자바스크립트에서 객체는 얕은 비교(객체의 주소에 의한 비교)를 하므로 값이 다르다고 판단.
    // 리렌더링이 일어남.
    // 이러한 오류를 해결하기 위해 → MemorizeCounterB 함수
    useEffect(()=>{
      console.log(`Counter B update = ${obj.count}`);
    })
    return <div>{obj.count}</div>
  };
  const areEqual = (prevProps,nextProps) =>{
    if(prevProps.obj.count===nextProps.obj.count){
      return true; // 이전 프롭스와 현재 프롭스가 같음 -> 리렌더링이 일어나지 않음
    };
    return false; // 이전 프롭스와 현재 프롭스가 다름 -> 리렌더링을 일으킴

    // 위와 아래는 같음
    // return prevProps.obj.count === nextProps.obj.count;
  }
  const MemorizeCounterB = React.memo(CounterB,areEqual);
  // areEqual함수의 판단에 따라 counterB를 리렌더링할지 말지 결정함

  return(
    <div style={{padding:60}}>
      {/* <div>
        <h2>Count</h2>
        <CountView count={count}/>
        <button onClick={()=>setCount(count+1)}>+</button>
      </div>
      <div>
        <h2>Text</h2>
        <TextView text={text}/>
        <input value={text} onChange={(e)=>setText(e.target.value)} />
      </div> */}
      <div>
        <h2>Counter A</h2>
        <CounterA count={count} />
        <button onClick={()=>setCount(count)}>A button</button>
      </div>
      <div>
        <h2>Counter B</h2>
        {/* <CounterB obj={obj} /> */}
        <MemorizeCounterB obj={obj} />
        <button onClick={()=>setObj({
          count : obj.count
        })}>B button</button>
      </div>
    </div>
  )
}
export default OptimizeTest;