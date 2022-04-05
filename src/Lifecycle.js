import React, {useEffect, useState} from "react";

const Lifecycle = () => { // 라이프사이클 적용해보기
  // const [count, setCount] = useState(0);
  // const [text, setText] = useState("");
  // useEffect(()=>{  // 두번째 인자에 빈배열을 넣어줄 경우 컴퍼넌트가 마운트 된 시점에만 작동.
  //   console.log("Mount!");
  // },[]);
  // useEffect(()=>{ // 두번째 인자에 아무것도 전달하지 않으면 컴포넌트가 업데이트 될 때 제어
  //   console.log("Update!");
  // });
  // useEffect(()=>{ // count가 변화하는 순간 업데이트가 진행됨
  //   console.log(`Count가 업데이트 되었습니다 : ${count}`);
  //   if(count>5){ // count가 5를 넘어갈 경우 1로 다시 세팅. 감지하고자 하는 요소만 감지할 수 있음.
  //     setCount(1); 
  //   }
  // },[count]);
  // useEffect(()=>{ // text가 변화하는 순간 업데이트가 진행됨
  //   console.log(`text가 업데이트 되었습니다 : ${text}`);
  // },[text]);
  
  //Unmount 제어
  const UnmountTest = () => {
    useEffect(()=>{
      console.log("Mount!");
      return () => {
        // useEffect안에 return함수를 넣으면 Unmount시점에 실행.
        console.log("unMount");
      }
    },[]);
    return <div>Unmount Testing Conmponent</div>
  }
  const [isVisible, setIsVisible] = useState(false);
  const toggle = () => setIsVisible(!isVisible);
  return (
    <div style={{padding:20}}>
      {/* <div>
        {count}
        <button onClick={()=>setCount(count+1)}>+</button>
      </div>
      <div>
        <input value={text} onChange={(e)=>setText(e.target.value)} />
      </div> */}
      <div>
        <button onClick={toggle}>On/Off</button>
        {isVisible && <UnmountTest/>}
        {/* isVisible이 true일 때만 UnmountTest가 렌더링.
            &&로 인해 isVisible의 true/false에 따라 결과가 달라짐 */}
      </div>
    </div>
  )
}

export default Lifecycle;