import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';
import { useRef, useState } from 'react';
import Lifecycle from './Lifecycle';

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
  const onCreate = (author,content,emotion) => { // 새로운 일기를 추가하는 함수
    const created_date = new Date().getTime();
    const newItem = {
      author,
      content,
      emotion,
      created_date,
      id : dataId.current
    }
    dataId.current += 1;
    setData([newItem, ...data]);
  }
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
  return (
    <div className="App">
      <Lifecycle />
      <DiaryEditor onCreate={onCreate} />
      <DiaryList diaryList={data} onRemove={onRemove} onEdit={onEdit}/>
      {/* <DiaryList diaryList={dumyList} 더미리스트를 사용했을 때 입력*/}
    </div>
  );
}

export default App;