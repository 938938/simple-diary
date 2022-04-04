import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';
import { useRef, useState } from 'react';

// const dumyList = [
//   {
//     id:1,
//     author:"abc",
//     content:"hihihi",
//     emotion:1,
//     created_date:new Date().getTime(),
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
  const [data,setData] = useState([]);
  const dataId = useRef(0);
  const onCreate = (author,content,emotion) => {
    const created_date = new Date().getTime();
    const newItem = {
      author,
      content,
      emotion,
      created_date,
      id : dataId.current
    }
    dataId.current += 1;
    setData([newItem,...data]);
  }
  const onRemove = (targetId) =>{
    console.log(`${targetId}가 삭제되었습니다`);
    const newDiaryList = data.filter((it)=>it.id !== targetId);
    setData(newDiaryList);
  }
  return (
    <div className="App">
      <DiaryEditor onCreate={onCreate} />
      <DiaryList diaryList={data} onRemove={onRemove}/>
    </div>
  );
}

export default App;