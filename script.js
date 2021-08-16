var navlinks = document.querySelectorAll("nav a");

function scrollVertically(targetSection, step = 50) {
  let top = targetSection.getBoundingClientRect().top;

  if (top <= step) {
    window.scrollBy(0, top);
    clearInterval(scrollInterval);
    return;
  } else if (
    Math.abs(
      document.documentElement.scrollHeight -
        document.documentElement.scrollTop -
        document.documentElement.clientHeight
    ) < 1
  ) {
    clearInterval(scrollInterval);
    return;
  }

  window.scrollBy(0, step);
}

function smoothScroll(event) {
  event.preventDefault();

  let id = this.getAttribute("href");
  if (id != "#") {
    targetSection = document.querySelector(id);
    scrollInterval = setInterval(scrollVertically, 5, targetSection);
  }
}

navlinks.forEach(function (link) {
  link.addEventListener("click", smoothScroll);
});

// Progress Bar Section

var progressBars = Array.from(document.getElementsByClassName("progress-bars"));

var skillContainer = document.getElementById("skills");
var animationDone = new Array(progressBars.length).fill(false);

function setZeroWidth() {
  progressBars.forEach(function (element) {
    element.style.transition = "";
    element.style.width = "0" + "%";
  });
}

function transformWidth() {
  progressBars.forEach(function (element) {
    element.style.transition = "width 2s linear 0s";
    element.style.width = element.getAttribute("skill-value") + "%";
  });
}

function setZeroWidth(element) {
  element.style.transition = "";
  element.style.width = "0" + "%";
}

function transformWidth(element) {
  element.style.transition = "width 2s linear 0s";
  element.style.width = element.getAttribute("skill-value") + "%";
}

function checkBarScroll(elem, idx) {
  var coordinates = elem.getBoundingClientRect();

  if (coordinates.top > 0) {
    if (coordinates.top < window.innerHeight) {
      if (!animationDone[idx]) {
        animationDone[idx] = true;
        transformWidth(elem);
      }
    } else {
      animationDone[idx] = false;
      setZeroWidth(elem);
    }
  } else if (Math.abs(coordinates.top) > coordinates.height) {
    if (animationDone[idx]) {
      animationDone[idx] = false;
      setZeroWidth(elem);
    }
  } else {
    if (!animationDone[idx]) {
      animationDone[idx] = true;
      transformWidth(elem);
    }
  }
}

function checkScroll() {
  progressBars.forEach(checkBarScroll);
}

window.addEventListener("scroll", checkScroll);
