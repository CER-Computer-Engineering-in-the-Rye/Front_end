console.log($(".upd-btn"));
$(".upd-btn").addEventListener("click", () => {
  let data1 = new FormData();

  axios.get("/board/info", data1).then((response) => {
    console.log(response);
    let url_string = window.location.href;
    let url = new URL(url_string);
    let c = url.searchParams.get("idx");
    const writer = response.data.item[c].writer;
    console.log($("input[name=title]").value);
    console.log(CKEDITOR.instances.editor1.getData());
    data1.append("sub", $("input[name=title]").value);
    data1.append("cnt", CKEDITOR.instances.editor1.getData());
    /*data1.append("writer", writer);*/
    write();
  });

  let url_string = window.location.href;
  let url = new URL(url_string);
  let c = url.searchParams.get("idx");

  console.log(data1);
  function write() {
    axios
      .post("/board/update?idx=" + c, data1) /*idx를 get으로 불러와야함*/
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
