window.onload = () => {
    // console.log("fuck");
    const add_new = document.querySelector("#box1");
    const cover = document.querySelector(".movement");
    const cross = document.querySelector(".cross");
    const submit = document.querySelector(".add-note");
    const title_note = document.getElementById("header");
    const content_note = document.getElementById("content");
    const title = [];
    const content = [];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let notes = [];

    title_note.focus();
    content_note.focus();

    add_new.addEventListener("click", () => {
        cover.style.transform = "scale(1)";
    });
    cross.addEventListener("click", () => {
        cover.style.transform = "scale(0)";
        title_note.value = "";
        content_note.value = "";
    });


    function display() {
        if (localStorage.getItem("notes") != null) {
            let notes_view = JSON.parse(localStorage.getItem("notes") || "[]");
            document.querySelectorAll('.item').forEach(function (e) { e.remove() });
            notes_view.forEach((val, index) => {
                console.log(val);
                let element = `<div class='box item'>
                <h5>${val.heading}</h5>
                <p>${val.body}</p>
                </div>`;
                document.getElementById("box1").insertAdjacentHTML("afterend", element);
            });
        }
    }
    display();


    submit.addEventListener("click", () => {
        title.push(title_note.value);
        content.push(content_note.value);
        if (title_note.value || content_note.value) {
            let dateobj = new Date();
            let month = months[dateobj.getMonth()];
            let year = dateobj.getFullYear();
            let date = dateobj.getDate();

            let note_info = {
                heading: title_note.value,
                body: content_note.value,
                date_info: date + ' ' + month + ' ' + year
            };
            notes=JSON.parse(localStorage.getItem("notes"));
            notes.push(note_info);
            localStorage.setItem("notes", JSON.stringify(notes));
            display();
        }

        title_note.value = "";
        content_note.value = "";
        cover.style.transform = "scale(0)";
    });

}