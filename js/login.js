const loginPassword = document.getElementById("loginPassword");
const wrapper = document.getElementById("wrapper");

window.onload = function() {
  
  wrapper.classList.remove("hidden");
  $('#cover').fadeOut(1000);
  loginPassword.focus();
}