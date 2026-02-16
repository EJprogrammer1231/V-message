   function submitForm() {
      const fullName = document.getElementById('fname').value;
      const email = document.getElementById('eMail').value;
      const password = document.getElementById('PWord').value;
      const confirmPass = document.getElementById('confirmPass').value;
      const age = document.getElementById('ageCheck').value;

      if (fullName.trim() === ""){
        alert("This field is required");
      }
      else if (email === "") {
        alert("This field is required Email");
      }
      else if (!email.includes("@") || !email.includes(".")) {
        alert("Email is must be conatin @ and .");
      } 
      else if (password.trim() === "") {
        alert("This field is required a password");
      }
      else if (password.includes("-")) {
        alert("No special characters");
      }
      else if (password.length < 6) {
        alert("The password must be at least 6 characters");
      }
      else if (confirmPass.trim() === "") {
        alert("This field is required a C-password");
      }
      else if (confirmPass !== password) {
        alert("The password is not equal");
      }
      else if (!age) {
        alert("Need age input");
      }
      else if (age < 18) {
        alert("Minor");
      }
      else {
        alert("COMPLETED A FORM THANK YOU!");
      }
    }

    function ClearAll() {
      const fullName = document.getElementById('fname').value = "";
      const email = document.getElementById('eMail').value = "";
      const password = document.getElementById('PWord').value = "";
      const confirmPass = document.getElementById('confirmPass').value = "";
      const age = document.getElementById('ageCheck').value = "";
    }