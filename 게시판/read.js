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
