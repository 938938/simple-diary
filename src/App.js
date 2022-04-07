import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';
import { useEffect, useRef, useState, useMemo, useCallback } from 'react';
// import OptimizeTest from './OptimizeTest';

// import Lifecycle from './Lifecycle';

// https://jsonplaceholder.typicode.com/comments //api 사용 연습을 위해 불러온 더미데이터

// const dumyList = [
//   {
//     id:1,
//     author:"abc",
//     content:"hihihi",
//     emotion:1,
//     created_date:new Date().getTime(),
//     // new Date() : 현재 시간을 기준으로 생성. getTime() : 시간을 밀리초로 반영
//   },
//   {
//     id:2,
//     author:"abc",
//     content:"hihihi",
//     emotion:1,
//     created_date:new Date().getTime(),
//   },
//   {
//     id:3,
//     author:"abc",
//     content:"hihihi",
//     emotion:1,
//     created_date:new Date().getTime(),
//   },
//   {
//     id:4,
//     author:"abc",
//     content:"hihihi",
//     emotion:1,
//     created_date:new Date().getTime(),
//   },
// ]

function App() {
  const [data,setData] = useState([]); //state 끌어올리기
  // setData : DiaryEditor에 전달. 해당 함수를 호출하여 새로운 아이템을 추가.
  // data : DiaryList에 전달. 추가된 데이터를 List에 반영
  const dataId = useRef(0);
  const getData = async() => { // promise를 반환하는 비동기 함수
    const res = await fetch( // api 불러오기
      'https://jsonplaceholder.typicode.com/comments'
    ).then((res)=>res.json());
    const initData = res.slice(0,20).map((it)=>{ //객체를 20개만 골라냄
      return{
        author : it.email,
        content : it.body,
        emotion : Math.floor(Math.random()*5)+1,
        // 0부터 4까지의 랜덤 난수를 생성 → 소수점을 버리는 fllor.
        created_date : new Date().getTime(),
        id : dataId.current++
      }
    });
    setData(initData);
  };
  useEffect(()=>{
    getData();
  },[]);
  const onCreate = useCallback((author,content,emotion) => { // 새로운 일기를 추가하는 함수
    //useCallback : 메모이제이션된 콜백을 반환. 값을 반환하는 useMemo와 달리 콜백함수를 반환함.
    const created_date = new Date().getTime();
    const newItem = {
      author,
      content,
      emotion,
      created_date,
      id : dataId.current
    }
    dataId.current += 1;
    setData((data)=>[newItem, ...data]);
  },[]);
  // 두번째 인자의 값이 변하지 않으면 첫번째 인자인 콜백 함수를 계속 재사용할 수 있도록 함
  // 두번째 인자로 빈배열을 할당하면 새로운 데이터를 입력했을 경우 빈배열을 불러와 기존 데이터가 사라짐.
  // → setData에 함수형 업데이트를 활용. 빈 배열을 할당해도 최신의 stat를 참고할 수 있게 됨
  const onRemove = (targetId) =>{ // 일기 삭제 함수
    // console.log(`${targetId}가 삭제되었습니다`);
    const newDiaryList = data.filter((it)=>it.id !== targetId);
    // targetId를 제외한 아이템으로 재배열
    setData(newDiaryList);
  }
  const onEdit = (targetId, newContent) => {
    // targetId : 어떤걸 수정할지, newContent : 어떻게 변동시킬 것인지
    setData( // 값 전달
      data.map((it)=> // 모든 요소를 순회, 새로운 배열을 만들어 셋데이터에 전달.
        it.id === targetId ? {...it, content:newContent} : it
        // targetId일 경우 수정된 데이터를 content에 교체, 아닐 경우 그대로 다시 리턴
      )
    )
  };
  const getDiaryAnalysis = useMemo( // 일기를 분석하는 함수
    //useMemo : 메모리즈하고 싶은 함수를 감쌈. 콜백함수를 전달.
    () => {
    const goodCount = data.filter((it)=>it.emotion>=3).length; // 기분이 3 이상인 배열의 갯수
    const badCount = data.length - goodCount;
    const goodRatio = (goodCount / data.length) * 100;
    return {goodCount, badCount, goodRatio};
    },[data.length] // data.length가 변화할 때에만 함수가 실행
  );
  const {goodCount, badCount, goodRatio} = getDiaryAnalysis;
  // useMemo를 사용하면 getDiaryAnalysis는 함수가 아니라 값이 됨
  return (
    <div className="App">
      {/* <OptimizeTest /> */}
      {/* <Lifecycle /> */}
      <DiaryEditor onCreate={onCreate} />
      <div>전체 일기 : {data.length}</div>
      <div>기분 좋은 일기 : {goodCount}, 기분 나쁜 일기 : {badCount}</div>
      <div>기분 좋은 일기의 비율 : {goodRatio}</div>
      <DiaryList diaryList={data} onRemove={onRemove} onEdit={onEdit}/>
      {/* <DiaryList diaryList={dumyList} 더미리스트를 사용했을 때 입력*/}
    </div>
  );
}

export default App;