import { useEffect, useRef, useState } from "react";
import Viewer from "./components/Viewer";
import Controller from "./components/Controller";
import Even from './components/Even'
import "./App.css";

export default function App() {
  // 상태만들기
  const [text, setText] = useState('')
  const [count, setCount] = useState(0);

  const didMountRef = useRef(false)

  const handleSetCount = (value) => {
    setCount(count + value);
  };

  const handleSetText = (e) => {
    setText(e.target.value)
  }
  // 컴포넌트 생애주기 중 업데이트가 발생하는 3가지 조건중 상태 변수가 변경될때
  // count, text의 state 변수가 변경될 때,
  // 컴포넌트 업데이트시에 useEffect의 콜백 함수가 실행 -> 현재는 콜백함수가 콘솔에 출력하기

  useEffect(() => {
    if(count) {
      console.log('count 업데이트')
    } else if (text) {
      console.log('text 업데이트')
    }
  }, [count, text])

  // 두 번째 인자인 의존성 배열에 값이 없으면,
  // 컴포넌트가 랜더링될 때마다 useEffect의 콜백 함수가 실행
  
  // useEffect(() => {
  //   console.log('업데이트')
  // })

  useEffect(() => {
    if(!didMountRef.current) {
      didMountRef.current = true;
      return
    } else {
      console.log('컴포넌트 업데이트')
    }
  })

  // useEffect(() => {
  //   console.log('마운트')
  // }, [])

  useEffect(() => {
    const intervalId = setInterval(() => {
      console.log("깜빡이요")
    },1000)
    console.log('클린업')
    clearInterval(intervalId)
  })
  return (
    <div className="App">
      <h1>simple counter</h1>
      <section>
        <input type="text" onInput={handleSetText} value={text} />
      </section>
      <section>
        {/* ↓ props : 부모컴포넌트에서 자식 컴포넌트에게 보내주는 데이터 */}
        <Viewer count={count} />
        {count % 2 === 0 && <Even/>}
      </section>
      <section>
        {/* ↓ props : 부모컴포넌트에서 자식 컴포넌트에게 보내주는 함수 */}
        <Controller count={count} setCount={handleSetCount} />
      </section>
    </div>
  );
}
