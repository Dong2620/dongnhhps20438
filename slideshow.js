var arrSlide = [
    "banner1.jpg",
    "banner1.1.png",
    "banner1.2.webp",
    "banner1.3.jpg",
    "banner1.5.jpg",
];
var i=0;
var vSlideImg = document.getElementById("myslide");
var  t; 
function fNext()
{
    i++;
    if(i>= arrSlide.length) i=0;
    vSlideImg.src ="images/" + arrSlide[i];
   
}
function fStart()
{
    t = window.setInterval(fNext,3000);
}
function fPrev()
{
    i--;
    if(i<=arrSlide.length) ;
    vSlideImg.src="images/" +arrSlide[i];
}