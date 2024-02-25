window.addEventListener("load", () => {
    let active_element = 0;

    function assign_click(array) {
        for (let index = 0; index < array.length; index++) {
            var element = array[index];
            element.addEventListener("click", () => {
                let menu = document.querySelectorAll(".menu");
                for (let i = 0; i < menu.length; i++) {
                    menu[i].style.transform = "scale(0)";
                }
                document.querySelectorAll(".menu")[index].style.transform = "scale(1)";
                active_element = index;
            });
        }
    }
    function hide_menu() {
        let array_of_menu = document.querySelectorAll(".menu");
        for (let i = 0; i < array_of_menu.length; i++)
            array_of_menu[i].style.transform = "scale(0)";
    }
    document.addEventListener("click", (e) => {
        if ((e.target != document.querySelectorAll(".datapoints")[active_element]))
            hide_menu();
    });
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
    let dateobj;
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
    // localStorage.clear();
    function display() {
        if (localStorage.getItem("notes") != null) {
            console.log(localStorage.getItem("notes"));
            let notes_view = JSON.parse(localStorage.getItem("notes"));
            notes_view = Array.from(notes_view);
            let counter = 1;
            notes_view.forEach((val, index) => {
                if(val.heading=="")
                val.heading="untitled";
                 if(val.body=="")
                 val.body="no body element";
                let element = `          
                <div class='box item'>
                <div class="upper">
                <h5>${val.heading}</h5>
                <p>${val.body}</p>
                </div>
                <div class="bottom-content">
                <hr>
                <span> ${val.date_info}</span>
                <ul class="menu">
                <li> <i class="fa-regular fa-trash-can remove"><span class="options">Delete</span></i></li>
                <li><i class="fa-regular fa-pen-to-square edit" id="${counter++}"><span class="options">Edit</span></i></li>
                </ul>
                <i class="fa-solid fa-ellipsis-vertical three-dots datapoints"></i>        
                </div>
                </div>`;             
                document.getElementById("box1").insertAdjacentHTML("afterend", element);
                // document.getElementById('notes-field').lastChild.insertAdjacentHTML("afterend",element);
                title_note.value = "";
                content_note.value = "";
            });
            assign_click(document.querySelectorAll(".datapoints"));
        }
        let deleteItems = document.querySelectorAll(".remove");
        deleteItems = Array.from(deleteItems);
        deleteItems.forEach((val) => {
            val.addEventListener("click", () => { deleteNote(deleteItems.length - 1 - deleteItems.indexOf(val)) })
        });
        edit_note();
    }
    display();

    submit.addEventListener("click", () => {
        title.push(title_note.value);
        content.push(content_note.value);
        if (title_note.value || content_note.value) {
            dateobj = new Date();
            let month = months[dateobj.getMonth()];
            let year = dateobj.getFullYear();
            let date = dateobj.getDate();

            let note_info = {
                heading: title_note.value,
                body: content_note.value,
                date_info: date + ' ' + month + ' ' + year
            };
            notes = JSON.parse(localStorage.getItem("notes"));
            if (notes == null)
                notes = [];
            notes = Array.from(notes);
            notes.push(note_info);
            localStorage.setItem("notes", JSON.stringify(notes));
            // show();
            location.reload();
        }
        cover.style.transform = "scale(0)";
    });
    function deleteNote(index) {
        console.log(index);
        let notes_view = JSON.parse(localStorage.getItem("notes"));
        notes_view = Array.from(notes_view);
        notes_view.splice(index, 1);
        console.log(notes_view);
        localStorage.setItem("notes", JSON.stringify(notes_view));
        location.reload();
    }
    function edit_note() {
        let editables = document.querySelectorAll(".edit");
        let stored_details = JSON.parse(localStorage.getItem("notes"));
        editables.forEach((x) => {
            x.addEventListener("click", () => {
                cover.style.transform = "scale(1)";
                let currentid = x.id;
                console.log(currentid);
                currentid = parseInt(currentid);
                if (stored_details[currentid - 1].heading != null)
                    document.getElementById("header").value = stored_details[currentid - 1].heading;
                if (stored_details[currentid - 1].body != null)
                    document.getElementById("content").value = stored_details[currentid - 1].body;
                document.querySelector(".add-note").addEventListener("click", () => {

                    stored_details.splice(currentid - 1, currentid - 1);
                    dateobj = new Date();
                    let month = months[dateobj.getMonth()];
                    let year = dateobj.getFullYear();
                    let date = dateobj.getDate();
                    stored_details[currentid - 1] = {
                        heading: title_note.value,
                        body: content_note.value,
                        date_info: date + ' ' + month + ' ' + year
                    };
                    console.log(stored_details);
                    localStorage.setItem("notes", JSON.stringify(stored_details));
                });
            });
        });
    }
});