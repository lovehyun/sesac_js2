import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
    const [loading, setLoading] = useState(false); // 초기값 false
    const [clearing, setClearing] = useState(false); // 초기값 false
    const [count, setCount] = useState(1); // 초기값 1
    const [data, setData] = useState(null); // 초기값

    const loadData = async () => {
        setLoading(true);

        // 강제로 1초 대기...
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // TODO. 맨 뒤에 1을 랜덤으로 생성하시오 (1~10까지의 랜덤으로...)
        const randomId = Math.floor(Math.random() * 100) + 1;
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${randomId}`);
            const result = await response.json();
            // console.log(result);
            setData(result);
        } catch (error) {
            setData({ error: true }); // 에러 발생시...
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadData();
    }, [count]); 
    // 지켜볼 변수, 이 변수가 변경될때마다, 이 함수 안의 내용을 실행해라..
    // 이 변수가 변경되었을때 발생하는 side-effect를 해결하기 위한 함수를 정의하는곳..
    // [] <-- 이거의 의미는, 최초 한번만 실행한다.

    // loadData();

    const renderData = () => {
        if (!data) {
            return <p>No data loaded.</p>
        }
        if (data.error) {
            return <p style={{ color: "red" }}>데이터 로딩에 실패하였습니다.</p>
        }
        return (
            <div>
                <h3>{data.title}</h3>
                <p>{data.body}</p>
            </div>
        );
    }

    const clearHandler = async () => {
        setClearing(true);
        // console.log('클리어 클릭됨');
        // 1초 대기
        await new Promise((resolve) => setTimeout(resolve, 1000));

        setData(null);
        setClearing(false);
    }

    return (
        <div className="container my-4">
            <button 
                className="btn btn-primary"
                onClick={() => setCount(count+1)} 
                disabled={loading || clearing }>
                    {loading ? (
                        <>
                            <span class="spinner-border spinner-border-sm"></span>
                            {" "}Loading...
                        </>
                    ) : (
                        "Load Data"
                    )}
            </button>
            
            <button 
                className="btn btn-danger ms-2"
                onClick={clearHandler} 
                disabled={clearing || loading || data === null}>
                    {clearing ? (
                        <>
                            <span class="spinner-border spinner-border-sm"></span>
                            {" "}Clearing...
                        </>
                    ) : (
                        "Clear"
                    )}
            </button>

            {/* 결과를 출력할 공간 */}
            <div className="mt-4">
                {data ? (
                    data.error ? (
                        <div className="alert alert-danger">
                            <p style={{ color: "red"}}>데이터 로딩에 실패하였습니다.</p>
                        </div>
                    ) : (
                        <div className="alert alert-success">
                            <h3>{data.title}</h3>
                            <p>{data.body}</p>
                        </div>
                    )
                ) : (
                    <div className="alert alert-secondary">
                        <p>No data loaded.</p>
                    </div>
                )}
            </div>

            {/* 위랑 똑같은 코드를 if 구문으로 짜면?? */}
            {/* { <div className="mt-4"> */}
                {/* {renderData()} */}
                {/* {(() => {
                    if (!data) {
                        return <p>No data loaded.</p>
                    }
                    if (data.error) {
                        return <p style={{ color: "red" }}>데이터 로딩에 실패하였습니다.</p>
                    }
                    return (
                        <div>
                            <h3>{data.title}</h3>
                            <p>{data.body}</p>
                        </div>
                    );
                })()} }
            </div> */}
        </div>
    );
}

export default App;
