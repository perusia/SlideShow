var swiper=new Swiper('.swiper-container',{
    spaceBetween: 30,
    centerdSliders:true,
    autoplay:{
        delay:2500,
        disableOnInteraction:false,
    },
    pagination:{
        el:'.swiper-padination',
        clickable:true,
    },
    navigaiton:{
        nextEl:'.seiper-button-next',
        prevEl:'.swiper-button-prev',
    },
});