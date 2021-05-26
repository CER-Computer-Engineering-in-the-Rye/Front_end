console.log($(".del"));
$(".del").addEventListener("click", () => {
  let data1 = new FormData();
  let url_string = window.location.href;
  let url = new URL(url_string);
  let c = url.searchParams.get("idx");
  console.log(c);
  axios
    .delete("/board/delete?idx=" + c, data1)
    .then((response) => {
      console.log(response);
      alert("삭제되었습니다");
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
