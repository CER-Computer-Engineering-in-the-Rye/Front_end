const $ = document.querySelector.bind(document);
const sub = $(".sub");
const wri = $(".wri");
const cnt = $(".cnt");
const date = $(".date");
axios.defaults.baseURL = "http://apigogi.dothome.co.kr";

let data = new FormData();

let url_string = window.location.href;
let url = new URL(url_string);
let c = url.searchParams.get("idx");
console.log(c);

axios.get("/board/info", data).then((response) => {
  const len = response.data.item.length;
  const idx = c;
  for (let i = 0; i < len; i++) {
    if (idx == response.data.item[i].idx) {
      const info = response.data.item[i];
      console.log(info);
      sub.innerText = info.subject;
      wri.innerText = info.writer;
      cnt.innerHTML = info.content;
      date.innerText = info.datetime;
    }
  }
  console.log(response);
});

console.log($(".del"));
$(".del").addEventListener("click", () => {
  let url_string = window.location.href;
  let url = new URL(url_string);
  let c = url.searchParams.get("idx");
  console.log(c);
  axios
    .get("/board/delete?idx=" + c)
    .then((response) => {
      console.log(response);
      alert("삭제되었습니다");
      location.href = 'list.html';
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response);
        alert(error.response.data.message);
      } else {
        console.log(error);
      }
    });
});

function mvwrite() {
    location.href = "writing.html";
}
function ss(){
    let url_string = window.location.href;
    let url = new URL(url_string);
    let c = url.searchParams.get("idx");
    const link = "update.html?idx=" + c;
    location.href=link;
}
function mvlist(){
    location.href="list.html";
}