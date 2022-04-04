const DiaryItem = ({author, content, created_date, emotion, id, onDelete}) =>{
  return(
    <div className="DiaryItem">
        <div className="info">
          <span>작성자 : {author} | 감정점수 : {emotion}</span>
          <button onClick={()=>{
            console.log(id);
            if(window.confirm(`${id}번 일기를 정말 삭제하겠습니까?`))(
              onDelete(id)
            );
          }}>X</button>
          <br />
          <span className="date">
            {new Date(created_date).toLocaleString()}
          </span>
        </div>
        <div className="content">
          {content}
        </div>
    </div>
  )
}

export default DiaryItem;