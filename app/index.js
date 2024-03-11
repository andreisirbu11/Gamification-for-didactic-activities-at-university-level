document.addEventListener("DOMContentLoaded", () => {
    
    const menuItems = document.querySelectorAll(".menu-item");
    const courses = document.querySelectorAll(".course");
  

    menuItems.forEach((item) => {
      item.addEventListener("click", function () {
       
        const mainContainer = document.querySelector(".main-container"); 
        if (mainContainer) {
          mainContainer.style.display = "none";
        }
  
     
        document.querySelectorAll(".content-div").forEach((div) => {
          if (div) {
            div.style.display = "none";
          }
        });
  
       
        const targetId = this.getAttribute("data-target");
        console.log(targetId);
        const targetDiv = document.getElementById(targetId);
        console.log(targetDiv);
  
      
        if (targetDiv) {
          targetDiv.style.display = "block";
        }
      });
    });
  
    courses.forEach((course) => {
      course.addEventListener("click", function () {
       
        const targetId = this.getAttribute("data-target");
        const targetDiv = document.getElementById(targetId);
        if (targetDiv) {
          if (targetDiv.style.display === "none")
            targetDiv.style.display = "block";
          else targetDiv.style.display = "none";
        }
      });
    });
  });