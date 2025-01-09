const container = document.getElementById('scroll-container');
const itemsPerLoad = 20;
let start = 0;
let end = start + itemsPerLoad;
let loading = false;

const maxItemsOnScreen = 100; // 한 화면에 표시될 아이템 개수

// 미션1. 아래 scroll 에서 하드코딩된 20, 40을 변수로 대체
// 미션2. 중복되는 두개의 fetch를 하나의 함수로 만들기
// 미션3. 서버의 데이터를 200개가 아닌 2000 또는 20000 으로 늘려보기...
// 미션4. 중복데이터 없는지 확인 (스크롤 아래로 다다닥 내리면서 살펴보기)
// 미션5. 너무 많은 데이터 화면에 뿌려져서 느려지면?? 어떻게 해결할 것인가..
// 미션6. 위에 삭제된 데이터, 다시 스크롤을 위로 올려서 화면 상단에서 불러오기...

// 초기 데이터 로딩
fetchData();

// 필요할때 데이터 로딩
function fetchData() {
    loading = true;

    fetch(`/api/data?start=${start}&end=${end}`)
        .then((response) => response.json())
        .then((items) => {
            // 새로운 아이템 추가
            console.log(`시작: ${start}, 끝 ${end}`)
            items.forEach((item) => {
                const itemElement = document.createElement('div');
                itemElement.classList.add('item');
                itemElement.textContent = item;
                container.appendChild(itemElement);
            });

            // 오래된 데이터 삭제
            // maxItemsOnScreen 이것을 사용해서 잘~~~
            let itemsToRemove = container.children.length - maxItemsOnScreen;
            if (itemsToRemove > 0) {
                console.log('지워야할 갯수는? ', itemsToRemove);
                // for (let i = 0; i < itemsToRemove; i++) {
                while (itemsToRemove-- > 0) {
                    container.removeChild(container.firstElementChild); 
                }
            }

            // 다음 데이터를 불러오기 위한 시작 위치를 변경
            start += items.length; // 받아온 갯수 다음부터 불러오도록 설정
            end = start + itemsPerLoad;

            // 1초 내에는 다시 못 불러오게 잠시 기다렸다가 설정
            // setTimeout(() => {
            loading = false;
            // }, 1000)
        })
}

function fetchPrevData() {
    const firstItem = container.firstElementChild;
    console.log(firstItem);

    const pend = firstItem ? parseInt(firstItem.textContent.replace('Item ', '')) - 1 : 0; // 현재 있는 데이터의 맨 앞의 -1
    const pstart = pend - itemsPerLoad;

    console.log(`이전 데이터 로딩... ${pstart}..${pend}`);
    fetch(`/api/data?start=${pstart}&end=${pend}`)
        .then((response) => response.json())
        .then((items) => {
            // 새로운 아이템 추가
            console.log(`시작: ${start}, 끝 ${end}`)
            items.forEach((item) => {
                const itemElement = document.createElement('div');
                itemElement.classList.add('item');
                itemElement.textContent = item;
                container.insertBefore(itemElement, firstItem); // 맨 앞에 삽입하기...
            });

            // 좌표를 계산해서.. 그만큼.. 스크롤바를 이동..
            const firstItemHeight = firstItem.clientHeight;
            const beforeLoadingPos = firstItemHeight * items.length; 
            window.scrollTo(0, beforeLoadingPos);

            // 화면에 초과된 갯수를 뒤에서 삭제..
            // 오래된 데이터 삭제
            // maxItemsOnScreen 이것을 사용해서 잘~~~
            let itemsToRemove = container.children.length - maxItemsOnScreen;
            if (itemsToRemove > 0) {
                console.log('지워야할 뒤의 갯수는? ', itemsToRemove);
                // for (let i = 0; i < itemsToRemove; i++) {
                while (itemsToRemove-- > 0) {
                    container.removeChild(container.lastElementChild); 
                }
            }
        })
}

window.addEventListener('scroll', () => {
    console.log(`스크롤위치는?? ${window.innerHeight}, ${window.scrollY}, ${document.body.offsetHeight}`)
    if (!loading && window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        console.log('화면 끝에 있음!!');
        fetchData();
    } else if (window.scrollY === 0) {
        fetchPrevData();
    }
});
