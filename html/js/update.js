const input_wri = $(".wri");
let url_string = window.location.href;
let url = new URL(url_string);
let c = url.searchParams.get("idx");

CKEDITOR.replace( 'editor1', {
    language: 'ko',
    uiColor: '#eeeeee',
    resize_enabled: false,
    width: '300px',
    height: '500px'
});

const getUserAll = () => {
  return axios.get('/user/'+localStorage.getItem('token')).then(
    response => {
      console.log(response);
      return Promise.resolve(response.data);
    }
  ).catch(
    error => {
      console.error(error);
      alert('로그인이 필요합니다!');
      location.href = 'login.html';
    }
  );
};

getUserAll().then(
  param => {
    input_wri.innerHTML = '작성자: '+param.id;
  }
);

console.log($(".upd-btn"));
$(".upd-btn").addEventListener("click", () => {
  getUserAll().then(
    param => {
      let data1 = new FormData();
      data1.append("sub", $("input[name=title]").value);
      data1.append("cnt", CKEDITOR.instances.editor1.getData());

      axios.post("/board/update/" + c, data1).then(
        (response) => {
          console.log(response);
          alert('글이 수정되었습니다.');
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
    }
  );
});
