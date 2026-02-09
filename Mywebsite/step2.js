   function forNo() {
        const noMessage = document.getElementById('noClick');
        if (noMessage) {
          const displayShow = document.getElementById('display');
          document.getElementById('display').style.display = "block";
        }
      }

      function forYes() {
        const yesContinue = document.getElementById('send-step3');

        if (yesContinue) {
          window.location.href = "step3.html";
        }
      }