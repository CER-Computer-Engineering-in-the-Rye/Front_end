const $ = document.querySelector.bind(document);
axios.defaults.baseURL = "http://apigogi.dothome.co.kr";

const input_wri = $(".wri");
let data = new FormData();
let url_string = window.location.href;
let url = new URL(url_string);
let c = url.searchParams.get("idx");
const idx = c;

axios.get("/board/info", data).then((response) => {
    const len = response.data.item.length;
    for (let i = 0; i < len; i++) {
        if (idx == response.data.item[i].idx) {
            const info = response.data.item[i];
            console.log(info);
            input_wri.innerText=info.writer;
        }
    }
});

CKEDITOR.replace( 'editor1', {
    language: 'ko',
    uiColor: '#eeeeee',
    resize_enabled: false,
    width: '300px',
    height: '500px'
});

console.log($(".upd-btn"));
$(".upd-btn").addEventListener("click", () => {
  let data1 = new FormData();
  data1.append("sub", $("input[name=title]").value);
  data1.append("cnt", CKEDITOR.instances.editor1.getData());
  data1.append("writer", 1);

  axios.post("/board/update?idx=" + idx, data1).then(
    (response) => {
      console.log(response);
      location.href = "list.html";
    }
  )
  .catch((error) => {
    if (error.response) {
      console.log(error.response);
      alert(error.response.data.message);
    } else {
      console.log(error);
    }
  });
});
