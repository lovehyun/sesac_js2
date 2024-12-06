const MemoList = ({ memos, deleteMemo, editMemo, toggleDone }) => {
    return (
        <div>
            {memos.map((memo) => {
                // console.log(memo);
                return (
                    <div key={memo.id} className="memo-item">
                        {/* 완료 체크박스 */}
                        <input 
                            type="checkbox"
                            checked={memo.completed}
                            onChange={() => toggleDone(memo.id)}
                            className="checkbox"
                        />

                        {/* 메모 텍스트 */}
                        <input
                            type="text"
                            value={memo.text}
                            disabled={memo.completed} // 완료된 메모는 수정 불가
                            onChange={(e) => editMemo(memo.id, e.target.value)}
                        />

                        {/* 버튼이 클릭 되었을때, 받아온 함수 호출 */}
                        <button onClick={() => deleteMemo(memo.id)}>삭제</button>
                    </div>
                )
            })}
        </div>
    )
}

export default MemoList;
