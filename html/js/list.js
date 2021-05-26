const see = $(".list");
axios.get("/board/info").then(
    (response) => {
        const len = response.data.item.length;
        for (let i = 0; i < len; i++) {
            const idx = response.data.item[i].idx;
            const title = response.data.item[i].title;
            const date = response.data.item[i].date;
            let tag = `
                <tr>
                    <th>${i}</th>
                    <td>
                        <a href="read.html?idx=${idx}" style="text-decoration:none; color:rgb(182, 182, 182)">${title}</a>
                    </td>
                    <td>${date}</td>
                </tr>
            `;
            see.innerHTML += tag;
        }
        console.log(response);
    },
    (error) => {
        console.error(error);
    }
);

function mvwrite() {
  location.href = "writing.html";
}