//Movement animation piece
const card = document.querySelector('.card');
const container = document.querySelector('.container');
const title = document.querySelector('.title');
const nzl = document.querySelector('.nzl');
const description = document.querySelector(".description");
const list = document.querySelector(".list");
const moreinfo = document.querySelector(".more-info");

//Animation event
container.addEventListener('mousemove', (e) => {
    let xAxis = (window.innerWidth / 2 - e.pageX) / 25;
    let yAxis = (window.innerWidth / 2 - e.pageY) / 25;
    card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
});
//Animate in
container.addEventListener("mouseenter", (e) => {
    card.style.transition = "none";
    //Pop out
    title.style.transform = "translateZ(100px)";
    nzl.style.transform = "translateZ(80px)";
    description.style.transform = "translateZ(50px)";
    list.style.transform = "translateZ(70px)";
    moreinfo.style.transform = "translateZ(90px)";
});
//Animate out
container.addEventListener("mouseleave", (e) => {
    card.style.transition = "all 0.5s ease";
    card.style.transform = `rotateY(0deg) rotateX(0deg)`;
    //Pop back
    title.style.transform = "translateZ(0px)";
    nzl.style.transform = "translateZ(0px)";
    description.style.transform = "translateZ(0px)";
    list.style.transform = "translateZ(0px)";
    moreinfo.style.transform = "translateZ(0px)";
});