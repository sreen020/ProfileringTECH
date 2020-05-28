function sidebar() {
    const filterBtn = document.getElementsByClassName("sidebar-handler") [0]; 
    const sidebar = document.querySelector(".sidebar");
    const closeBtn = document.querySelector(".close-handler");

    console.log(sidebar);
    
    filterBtn.addEventListener('click', () => {
        console.log("click")
        sidebar.style.display = "block"
    });

    closeBtn.addEventListener('click', () => {
        sidebar.style.display = "none"
    });

}

sidebar();