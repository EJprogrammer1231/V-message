function submitInfo() {
        const toGo = document.getElementById('toGo-user').value
        const toEat = document.getElementById('toEat-user').value
        const toDiscuss = document.getElementById('toDiscuss-user').value

        if (toGo === "") {
          const pop = document.getElementById('popUp');
          document.getElementById('popUp').style.display = "block";
        }
        else if (toEat === "") {
          const pop = document.getElementById('popUp');
          document.getElementById('popUp').style.display = "block";
        }
        else if (toDiscuss === "") {
          const pop = document.getElementById('popUp');
          document.getElementById('popUp').style.display = "block";
        }
        else {
          const donepop = document.getElementById('doneInfo');
          document.getElementById('doneInfo').style.display = "block";
        }
      }