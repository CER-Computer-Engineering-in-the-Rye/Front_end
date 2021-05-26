CKEDITOR.replace( 'editor1', {
  language: 'ko',
  uiColor: '#eeeeee',
  resize_enabled: false,
  width: '500px',
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

const input_wri = $(".wri");
getUserAll().then(
  param => {
    input_wri.innerHTML = '작성자: '+param.id;
  }
);

$(".wts-btn").addEventListener("click", () => {
  getUserAll().then(
    param => {
      let data1 = new FormData();
      data1.append("sub", $("input[name=title]").value);
      data1.append("cnt", CKEDITOR.instances.editor1.getData());
      data1.append("user_idx", param.idx);

      axios.post("/board/write", data1).then(
        response => {
          console.log(response);
          alert('글이 등록되었습니다.');
          location.href = "list.html";
        }
        ).catch(
        error => {
          if (error.response) {
            console.log(error.response);
            alert(error.response.data.message);
          } else {
            console.log(error);
          }
        }
      );
  });
});