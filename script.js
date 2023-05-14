const choose_img_btn = document.querySelector(".choose_img button"),
choose_img = document.querySelector('.choose_img input'),
slider = document.querySelector('.slider input'),
filter_name = document.querySelector('.filter_info .name'),
slider_value = document.querySelector('.filter_info .value'),
view_img = document.querySelector('.view_img img'),
save_btn = document.querySelector('.save'),
reset_btn = document.querySelector('.reset'),
filter_btns = document.querySelectorAll('.icons_room button')
rotate_btns = document.querySelectorAll('.icons_room1 button')

let brightness = "100",contrast = "100",opacity = "100",rotate = 0,
invert = "0",blurs = "0",flipHorizontal = 1, flipVertical = 1;

const applyFilter = ()=>{
    view_img.style.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${opacity}%) invert(${invert}%) blur(${blurs}px)`;
    view_img.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal}, ${flipVertical})`
}
const loadImage = ()=>{
    let imgSrc = document.getElementById('myFile');
    let file = imgSrc.files[0]
    if(!file) return
    view_img.src = URL.createObjectURL(file);
    document.querySelector('.container').classList.remove('disabled')
}




filter_btns.forEach((element) => {
    element.addEventListener("click", () => {
      document.querySelector(".active").classList.remove("active");
      element.classList.add("active");
      filter_name.innerText = element.id;
      if (element.id === "brightness") {
        slider.max = "200";
        slider.value = brightness;
        slider_value.innerText = `${brightness}`;
      } else if (element.id === "contrast") {
        slider.max = "200";
        slider.value = contrast;
        slider_value.innerText = `${contrast}`;
      } else if (element.id === "contrast") {
        slider.max = "200";
        slider.value = saturate;
        slider_value.innerText = `${saturate}`;
      } else if (element.id === "invert") {
        slider.max = "100";
        slider.value = invert;
        slider_value.innerText = `${invert}`;
      } else if (element.id === "blur") {
        slider.max = "100";
        slider.value = blurs;
        slider_value.innerText = `${blurs}`;
      }
    });
  });




rotate_btns.forEach((ele)=>{
    ele.addEventListener('click',()=>{
        if(ele.id==='rotate_left'){
            rotate-=90
        }
        else if(ele.id==='rotate_right'){
            rotate+=90
        }
        else if(ele.id==='flip_x'){
            flipHorizontal = flipHorizontal === 1 ? -1:1;
        }else if(ele.id==='flip_y'){
            flipVertical = flipVertical === 1 ? -1:1
        }
        applyFilter()
    })
})
const resetFilter = ()=>{
    brightness = "100",contrast = "100",rotate = 0,opacity = "100",invert = "0",blurs = "0",flipHorizontal = 1, flipVertical = 1;
    applyFilter();
}




const updateFilter = ()=>{
    slider_value.innerText = `${slider.value}%`;
    let sliderState = document.querySelector(".icons_room .active");
    if (sliderState.id === "brightness") {
      brightness = slider.value;
    } else if (sliderState.id === "contrast") {
      contrast = slider.value;
    } else if (sliderState.id === "saturate") {
      saturate = slider.value;
    } else if (sliderState.id === "invert") {
      invert = slider.value;
    } else if (sliderState.id === "blur") {
      blurs = slider.value;
    }
    applyFilter()
}


const saveImage = ()=>{
    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext("2d")
    canvas.width=view_img.naturalWidth;
    canvas.height = view_img.naturalHeight
    ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${opacity}%) invert(${invert}%) blur(${blurs}px)`;
    ctx.scale(flipHorizontal,flipVertical);
    ctx.translate(canvas.width/2,canvas.height/2);
    ctx.drawImage(view_img,-canvas.width/2,-canvas.height/2,canvas.width,canvas.height);
    const link = document.createElement("a");
    link.download = "image.png";
    link.href = canvas.toDataURL();
    link.click();
}



choose_img.addEventListener('change',loadImage)
choose_img_btn.addEventListener("click",()=>{choose_img.click()})
reset_btn.addEventListener('click',resetFilter)
slider.addEventListener('input',updateFilter)
save_btn.addEventListener('click',saveImage)