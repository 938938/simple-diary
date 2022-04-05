import { useRef, useState } from "react";

const DiaryItem = ({author, content, created_date, emotion, id, onRemove, onEdit}) =>{
  const [isEdit, setIsEdit] = useState(false); // 수정기능. 활성화 되지 않은 상태가 디폴트(false)
  const toggleIsEdit = () => setIsEdit(!isEdit); // 수정기능의 활성화와 비활성화 반전연산 함수
  const [localContent, setLocalContent] = useState(content); // 수정기능을 핸들링할 state
  const localContentInput = useRef(); // 미입력시 focus 기능을 주기 위한 useRef

  const handleRemove = () => { // 삭제 기능
    if(window.confirm(`일기를 정말 삭제하겠습니까?`))(
      onRemove(id)
    );
  }
  const handleQuitEdit = () => { // 수정 취소 버튼
    setIsEdit(false);
    setLocalContent(content);
  }
  const handleEdit = () => { // 수정 완료 버튼
    if(localContent.length<3){
      localContentInput.current.focus();
      return;
    };
    if(window.confirm(`일기를 수정하시겠습니까?`)){
      onEdit(id, localContent);
      toggleIsEdit(); // 수정 완료 후 수정 폼을 닫는 역할
    };
  }
  return(
    <div className="DiaryItem">
        <div className="info">
          <span>작성자 : {author} | 감정점수 : {emotion}</span>
          <button className="remove" onClick={handleRemove}>X</button>
          {/* 삭제 버튼 */}
          <br />
          <span className="date">
            {new Date(created_date).toLocaleString()}
            {/* toLocaleString() : 사람이 알아보기 쉬운 숫자로 반영 */}
          </span>
        </div>
        <div className="content">
          {/* {content} */}
          {isEdit ? (
            <>
              <textarea
                ref={localContentInput}
                value={localContent}
                onChange={(e)=>setLocalContent(e.target.value)}
              />
            </>
          ) : (
            <>{content}</>
          )}
        </div>
        {/* 수정기능의 on/off에 따른 버튼 변화 */}
        {isEdit ? <>
          <button className="edit" onClick={handleQuitEdit}>수정취소</button>
          <button className="edit" onClick={handleEdit}>수정완료</button>
        </>:<>
          <button className="edit" onClick={toggleIsEdit}>수정하기</button>
        </>}
    </div>
  )
}

export default DiaryItem;