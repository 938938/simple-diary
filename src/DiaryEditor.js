import React,{ useRef, useState, useEffect } from 'react';

const DiaryEditor = ({onCreate}) => { // 클래스와 컴포넌트의 이름을 일치, 직관적으로 사용.
  useEffect(()=>(console.log("DiaryEditor 렌더")));
  const authorInput = useRef();
  const contentInput = useRef();
  const [state, setState] = useState({
    // author, content 등의 동작이 비슷한 state는 하나로 묶을 수 있음.
    author:"",
    content:"",
    emotion:1,
  });
  const handleChangeState = (e) => { // onChange에 전달될 함수
    setState({
      ...state, // 일부의 값을 변경할 때에는 스프레드 연산자를 먼저 작성해야 함.
      [e.target.name]: e.target.value, // author, content등의 상태변화 입력,반영.
    });
  }
  const handleSubmit = () =>{ // 저장 버튼 함수
    if(state.author.length<1){
      // 입력칸 미입력 경우 미입력된 부분을 포커스하며 진행 종료(저장되지 않음)
      authorInput.current.focus(); // useref는 현재 가리키는 값을 current라는 프로퍼티로 사용가능.
      return;
    };
    if(state.content.length<1){
      contentInput.current.focus();
      return;
    };
    onCreate(state.author, state.content, state.emotion); // 저장값 전달
    alert("저장 완료");
    setState({ // 저장 완료 후 입력칸 초기화
      author:"",
      content:"",
      emotion:1,
    });
  };
  return (
    <div className="DiaryEditor">
      <h2>오늘의 일기</h2>
      <div>
        <input // 작성자 이름 입력 파트
          ref={authorInput} // input 태그에 접근 가능
          name="author" // 변경 값을 바르게 전달하기 위해 설정
          value={state.author}
          onChange={handleChangeState} // 인풋이 변화할 때마다 콜백함수 출력. 
        />
      </div>
      <div>
        <textarea // 일기 내용 입력 파트
          ref={contentInput}
          name="content"
          value={state.content}
          onChange={handleChangeState}
        />
      </div>
      <div>
        <select // 감정 파트
          name="emotion"
          value={state.emotion}
          onChange={handleChangeState}
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
      </div>
      <div>
        <button onClick={handleSubmit}>저장하기</button>
      </div>
    </div>
    );
};

export default React.memo(DiaryEditor); // React.memo를 여기에 사용해도 됨.