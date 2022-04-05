import DiaryItem from "./DiaryItem";

const DiaryList = ({diaryList,onRemove,onEdit}) => {
  return (
    <div className="DiaryList">
      <h2>일기 리스트!</h2>
      <h4>{diaryList.length}개의 일기가 있습니다</h4>
      <div>
        {diaryList.map((it)=>
          <DiaryItem key={it.id} {...it} onRemove={onRemove} onEdit={onEdit}/>
          // {...it} : it이라는 객체에 포함된 모든 데이터가 전달
          // key={it.id} : 아이템에 고유한 키값을 부여.
          // id값에 인덱스 값을 사용할 경우, 추가 삭제 등의 변동으로 인해 오류가 발생할 가능성이 있음
        )}
      </div>
    </div>
  )
}

DiaryList.defaultProps={ // 디폴트값. undefined으로 전달될 경우 반영됨.
  diaryList:[],
}

export default DiaryList;