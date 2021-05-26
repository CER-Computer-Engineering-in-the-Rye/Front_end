const $ = document.querySelector.bind(document);
const sub = $(".sub");
const wri = $(".wri");
const cnt = $(".cnt");
const date = $(".date");
axios.defaults.baseURL = "http://apigogi.dothome.co.kr";

let data = new FormData();

axios.get("/board/info", data).then((response) => {
  const len = response.data.item.length;
  const idx = 1; /*get방식으로 불러와진 데이터로 수정 필요*/
  for (let i = 0; i < len; i++) {
    if (idx == response.data.item[i].idx) {
      const info = response.data.item[i];
      console.log(info);
      sub.innerText = info.subject;
      wri.innerText = info.writer;
      cnt.innerText = info.content;
      date.innerText = info.datetime;
    }
  }
  console.log(response);
});
