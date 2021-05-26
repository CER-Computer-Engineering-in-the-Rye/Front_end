const sub = $(".sub");
const wri = $(".wri");
const cnt = $(".cnt");
const date = $(".date");

let url_string = window.location.href;
let url = new URL(url_string);
let c = url.searchParams.get("idx");

const getUserId = idx => {
  return axios.get('/user/id/'+idx);
};

axios.get('/board/info/'+c).then(
  response => {
    console.log(response);

    const deleteButton = $('.delete-button');
    const updateButton = $('.update-button');

    axios.get('/user/'+localStorage.getItem('token')).then(
      response2 => {
        console.log(response2);
        if (response.data.user_idx == response2.data.idx) {
          deleteButton.style.display = 'initial';
          updateButton.style.display = 'initial';
        }
        else {
          deleteButton.style.display = 'none';
          updateButton.style.display = 'none';
        }
      }
    ).catch(
      error => {
        console.error(error);
        deleteButton.style.display = 'none';
        updateButton.style.display = 'none';
      }
    );

    getUserId(response.data.user_idx).then(
      response2 => {
        console.log(response2);
        sub.innerHTML = response.data.title;
        wri.innerHTML = response2.data.id;
        cnt.innerHTML = response.data.content;
        date.innerHTML = response.data.date;
      }
    ).catch(
      error => {
        if (error.response) {
          alert(error.response.data.message);
          location.href = 'list.html';
        }
        else {
          console.error(error);
        }
      }
    );
  },
  error => {
    console.error(error);
  }
);

console.log($(".del"));
$(".del").addEventListener("click", () => {
  let url_string = window.location.href;
  let url = new URL(url_string);
  let c = url.searchParams.get("idx");
  console.log(c);
  axios
    .get("/board/delete/"+c)
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