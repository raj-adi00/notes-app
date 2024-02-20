window.onload = ()=>{
    // console.log("fuck");
    const add_new = document.querySelector("#box1");
    const cover = document.querySelector(".movement");
    const cross = document.querySelector(".cross");

    add_new.addEventListener("click", ()=>{
        cover.style.transform = "scale(1)";
    });
    cross.addEventListener("click", ()=>{
        cover.style.transform = "scale(0)";
    });
}