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
