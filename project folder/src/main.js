'use strict';

// Fetch the items from the JSON file
function loadItems(){
    return fetch('data/data.json')
    .then(response => response.json())
    .then(json => json.items);
}

// Update the list with the given items.
// 전달 받은 items를 html 요소로 만들어 전달한다.
function displayItems(items){
    // getElementByID 보다는 querySelector를 이용해서 주로 사용한다.
    const container = document.querySelector('.items');
    // 1. map을 이용해 value를 mapping한다.
    // 2. mapping 한 value를 join을 이용해 하나의 배열로 묶는다.
    // 3. 이것을 container.innerHTML로 전달한다.
    container.innerHTML = items.map(item => createHTMLString(item)).join('');
}

// make li html string with given item information object.
function createHTMLString(item){
    return `
    <li class="item">
        <img src="${item.image}" alt="${item.type}" class="item__thumbnail">
        <span class="item__description">${item.gender}, ${item.size}</span>
    </li>
    `;
}
// executing when button is clicked!
function onButtonClick(event, items) {
    const dataset = event.target.dataset;
    const key = dataset.key;
    const value = dataset.value;
    // event에 filtering 정보를 담기 위해 custom property를 이용 (data-key, data-value)
    console.log(key);
    console.log(value);

    // 둘 중 하나가 null이면 조기 종료
    if(key == null || value == null){
        return;
    }
    // using filter method filtering items with (item[key] === value)
    displayItems(items.filter(item => item[key] === value));
}

function setEventListeners(items){
    const logo = document.querySelector('.Logo');
    const buttons = document.querySelector('.buttons');
    // 하나하나의 event listener를 반복해서 등록하는 것 보다
    // 버튼들이 들어있는 container를 event listener로 등록해서 
    // 한 곳에서만 handling 할 수 있도록 만드는 방법 -> 효율적임

    logo.addEventListener('click', () => displayItems(items));
    // event가 발생했을 때만 실행되도록
    buttons.addEventListener('click', (event) => onButtonClick(event, items));
}

// main
loadItems()
.then(items => {
    console.log(items);
    displayItems(items);
    setEventListeners(items);
})
.catch(console.log);

