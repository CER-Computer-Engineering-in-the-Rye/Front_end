CKEDITOR.replace( 'editor1', {
    language: 'ko',
    uiColor: '#eeeeee',
    resize_enabled: false,
    width: '300px',
    height: '500px'
});

const $ = document.querySelector.bind(document);
const input_wri = $(".wri");
axios.defaults.baseURL = "http://apigogi.dothome.co.kr";
let data = new FormData();
axios.get("/board/info", data).then((response) => {
  const writer =
    response.data.item[0].writer; /*user 계정 아이디로 수정 필요*/
  console.log(response);
  const span = document.createElement("span");
  span.innerText = writer;
  input_wri.appendChild(span);
});

console.log($(".wts-btn"));
$(".wts-btn").addEventListener("click", () => {
  let data1 = new FormData();

  console.log("12321312");
  axios.get("/board/info", data1).then((response) => {
    console.log(response);
    const writer = response.data.item[0].writer; /*계정*/
    console.log($("input[name=title]").value);
    console.log(CKEDITOR.instances.editor1.getData());
    data1.append("sub", $("input[name=title]").value);
    data1.append("cnt", CKEDITOR.instances.editor1.getData());
    /*data1.append("writer", writer);*/
    write();
  });

  console.log(data1);
  function write() {
    axios
      .post("/board/write", data1)
      .then((response) => {
        console.log(response);
        location.href = "list.html";
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          alert(error.response.data.message);
        } else {
          console.log(error);
        }
      });
  }
});