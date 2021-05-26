const getUser = () => {
	return axios.get('/user/'+localStorage.getItem('token')).then(
	    (response) => {
	      	console.log(response);
	      	$('.account').innerHTML = `
	      		<div class="profile">
	      			${response.data.id}님 안녕하세요.
	      			<div class="logout-button" onclick="logout();">로그아웃</div>
	      		</div>
	      	`;
	    }
  	)
  	.catch((error) => {
	    if (error.response) {
	      	console.log(error.response);
	    } else {
	      	console.log(error);
	    }
	    $('.account').innerHTML = `
      		<div class="login-button" onclick="location.href = 'login.html';">login</div>
	    `;
  	});
}

const logout = () => {
	return axios.get('/logout/'+localStorage.getItem('token')).then(
	    (response) => {
	      	console.log(response);
	      	alert('로그아웃에 성공하였습니다.');
	      	$('.account').innerHTML = `
	      		<div class="login-button" onclick="location.href = 'login.html';">login</div>
		    `;
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

getUser();