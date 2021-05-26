const $ = document.querySelector.bind(document);
const see = $(".list");
axios.defaults.baseURL = "http://apigogi.dothome.co.kr";
let data = new FormData();

axios.get("/board/info", data).then((response) => {
  const len = response.data.item.length;

  for (let i = 0; i < len; i++) {
    const tr = document.createElement("tr");
    const idx = document.createElement("th");
    const sub = document.createElement("td");
    const date = document.createElement("td");
    idx.innerText = i;
    sub.innerText = response.data.item[i].subject;
    date.innerText = response.data.item[i].datetime;
    tr.appendChild(idx);
    tr.appendChild(sub);
    tr.appendChild(date);
    see.appendChild(tr);
  }
  console.log(response);
});
